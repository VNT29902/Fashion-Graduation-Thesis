package com.skaly.fashion_backend.cart;

import com.skaly.fashion_backend.common.ResourceNotFoundException;
import com.skaly.fashion_backend.coupon.CouponService;
import com.skaly.fashion_backend.product.ProductService;
import com.skaly.fashion_backend.product.ProductVariant;
import com.skaly.fashion_backend.user.User;
import com.skaly.fashion_backend.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.skaly.fashion_backend.cart.event.CartMergedEvent;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CartService {

        private final CartRepository cartRepository;
        private final CartItemRepository cartItemRepository;
        private final ProductService productService;
        private final UserRepository userRepository;
        private final CouponService couponService;
        private final ApplicationEventPublisher eventPublisher;

        @Transactional
        public CartDto getCart(String userEmail, String guestId) {
                Cart cart = resolveCart(userEmail, guestId);
                validateInventoryAndPrices(cart);
                validateAndApplyCoupon(cart);
                return mapToDto(cart);
        }

        @Transactional
        public CartDto addToCart(String userEmail, String guestId, AddToCartRequest request) {
                Cart cart = resolveCart(userEmail, guestId);
                ProductVariant variant = productService.getProductVariantById(request.productVariantId());

                BigDecimal currentPrice = variant.getProduct().getBasePrice();
                if (variant.getPriceAdjustment() != null) {
                        currentPrice = currentPrice.add(variant.getPriceAdjustment());
                }

                Optional<CartItem> existingItem = cart.getItems().stream()
                                .filter(item -> item.getProductVariant().getId().equals(variant.getId()))
                                .findFirst();

                if (existingItem.isPresent()) {
                        CartItem item = existingItem.get();
                        item.setQuantity(item.getQuantity() + request.quantity());
                        item.setSnapshotPrice(currentPrice);
                } else {
                        CartItem newItem = CartItem.builder()
                                        .cart(cart)
                                        .productVariant(variant)
                                        .quantity(request.quantity())
                                        .snapshotPrice(currentPrice)
                                        .build();
                        cart.addItem(newItem);
                }

                validateInventoryAndPrices(cart);
                validateAndApplyCoupon(cart);
                Cart savedCart = cartRepository.save(cart);
                return mapToDto(savedCart);
        }

        @Transactional
        public CartDto updateCartItem(String userEmail, String guestId, UpdateCartRequest request) {
                Cart cart = resolveCart(userEmail, guestId);

                CartItem item = cartItemRepository.findById(request.cartItemId())
                                .filter(i -> i.getCart().getId().equals(cart.getId()))
                                .orElseThrow(() -> new ResourceNotFoundException("Cart Item not found in cart"));

                if (request.quantity() <= 0) {
                        cart.removeItem(item);
                } else {
                        item.setQuantity(request.quantity());
                }

                validateInventoryAndPrices(cart);
                validateAndApplyCoupon(cart);
                Cart savedCart = cartRepository.save(cart);
                return mapToDto(savedCart);
        }

        @Transactional
        public CartDto removeCartItem(String userEmail, String guestId, UUID cartItemId) {
                Cart cart = resolveCart(userEmail, guestId);

                CartItem item = cartItemRepository.findById(cartItemId)
                                .filter(i -> i.getCart().getId().equals(cart.getId()))
                                .orElseThrow(() -> new ResourceNotFoundException("Cart Item not found"));

                cart.removeItem(item);
                validateInventoryAndPrices(cart);
                validateAndApplyCoupon(cart);
                Cart savedCart = cartRepository.save(cart);
                return mapToDto(savedCart);
        }

        @Transactional
        public CartDto applyCoupon(String userEmail, String guestId, String couponCode) {
                Cart cart = resolveCart(userEmail, guestId);
                cart.setCouponCode(couponCode);
                validateAndApplyCoupon(cart);
                Cart savedCart = cartRepository.save(cart);
                return mapToDto(savedCart);
        }

        @Transactional
        public void clearCart(String userEmail, String guestId) {
                Cart cart = resolveCart(userEmail, guestId);
                cart.clearItems();
                cart.setCouponCode(null);
                cart.setDiscountAmount(BigDecimal.ZERO);
                cartRepository.save(cart);
        }

        @Transactional
        public CartDto mergeCart(String userEmail, String guestId) {
                if (userEmail == null || guestId == null) {
                        throw new IllegalArgumentException("Both User Email and Guest ID are required for merging");
                }

                User user = userRepository.findByEmail(userEmail)
                                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

                Cart userCart = cartRepository.findByUserId(user.getId())
                                .orElseGet(() -> cartRepository.save(Cart.builder().user(user).build()));

                Optional<Cart> optionalGuestCart = cartRepository.findByGuestId(guestId);

                if (optionalGuestCart.isPresent()) {
                        Cart guestCart = optionalGuestCart.get();

                        // Move items from guest cart to user cart
                        List<CartItem> guestItems = new ArrayList<>(guestCart.getItems());
                        for (CartItem guestItem : guestItems) {
                                guestCart.removeItem(guestItem);

                                Optional<CartItem> existingUserItem = userCart.getItems().stream()
                                                .filter(ui -> ui.getProductVariant().getId()
                                                                .equals(guestItem.getProductVariant().getId()))
                                                .findFirst();

                                if (existingUserItem.isPresent()) {
                                        existingUserItem.get().setQuantity(
                                                        existingUserItem.get().getQuantity() + guestItem.getQuantity());
                                        existingUserItem.get().setSnapshotPrice(guestItem.getSnapshotPrice()); // Take
                                                                                                               // newest
                                                                                                               // snapshot
                                } else {
                                        userCart.addItem(guestItem);
                                }
                        }

                        // Prefer user's coupon, fallback to guest's
                        if (userCart.getCouponCode() == null && guestCart.getCouponCode() != null) {
                                userCart.setCouponCode(guestCart.getCouponCode());
                        }

                        int mergedCount = guestItems.size();
                        cartRepository.delete(guestCart);

                        eventPublisher.publishEvent(new CartMergedEvent(user.getId(), guestId, mergedCount));
                }

                validateInventoryAndPrices(userCart);
                validateAndApplyCoupon(userCart);
                Cart savedCart = cartRepository.save(userCart);
                return mapToDto(savedCart);
        }

        private Cart resolveCart(String userEmail, String guestId) {
                if (userEmail != null) {
                        User user = userRepository.findByEmail(userEmail)
                                        .orElseThrow(() -> new ResourceNotFoundException("User not found"));
                        return cartRepository.findByUserId(user.getId())
                                        .orElseGet(() -> cartRepository.save(Cart.builder().user(user).build()));
                } else if (guestId != null) {
                        return cartRepository.findByGuestId(guestId)
                                        .orElseGet(() -> cartRepository.save(Cart.builder().guestId(guestId).build()));
                } else {
                        throw new IllegalArgumentException(
                                        "Either User Email or Guest ID must be provided to resolve cart");
                }
        }

        private void validateInventoryAndPrices(Cart cart) {
                List<CartItem> toRemove = new ArrayList<>();

                for (CartItem item : cart.getItems()) {
                        ProductVariant variant = item.getProductVariant();

                        // Auto-remove out of stock
                        if (variant.getStockQuantity() <= 0) {
                                toRemove.add(item);
                                continue;
                        }

                        // Adjust quantity if exceeds stock
                        if (item.getQuantity() > variant.getStockQuantity()) {
                                item.setQuantity(variant.getStockQuantity());
                                item.setQuantityAdjusted(true);
                        } else {
                                item.setQuantityAdjusted(false);
                        }

                        // Update snapshot price to latest
                        BigDecimal currentPrice = variant.getProduct().getBasePrice();
                        if (variant.getPriceAdjustment() != null) {
                                currentPrice = currentPrice.add(variant.getPriceAdjustment());
                        }
                        item.setSnapshotPrice(currentPrice);
                }

                toRemove.forEach(cart::removeItem);
        }

        private void validateAndApplyCoupon(Cart cart) {
                if (cart.getCouponCode() == null || cart.getCouponCode().isBlank()) {
                        cart.setDiscountAmount(BigDecimal.ZERO);
                        return;
                }

                BigDecimal subTotal = calculateSubTotal(cart);
                try {
                        BigDecimal discount = couponService.calculateDiscount(cart.getCouponCode(), subTotal);
                        cart.setDiscountAmount(discount);
                } catch (Exception e) {
                        // If coupon becomes invalid, remove it
                        cart.setCouponCode(null);
                        cart.setDiscountAmount(BigDecimal.ZERO);
                }
        }

        private BigDecimal calculateSubTotal(Cart cart) {
                return cart.getItems().stream()
                                .map(item -> item.getSnapshotPrice().multiply(BigDecimal.valueOf(item.getQuantity())))
                                .reduce(BigDecimal.ZERO, BigDecimal::add);
        }

        private CartDto mapToDto(Cart cart) {
                List<CartItemDto> itemDtos = new ArrayList<>();
                BigDecimal subTotal = BigDecimal.ZERO;

                for (CartItem item : cart.getItems()) {
                        ProductVariant variant = item.getProductVariant();
                        BigDecimal price = item.getSnapshotPrice();
                        int qty = item.getQuantity();
                        BigDecimal itemSubTotal = price.multiply(BigDecimal.valueOf(qty));

                        subTotal = subTotal.add(itemSubTotal);

                        boolean isOutOfStock = variant.getStockQuantity() <= 0;
                        boolean quantityAdjusted = item.isQuantityAdjusted();

                        itemDtos.add(new CartItemDto(
                                        item.getId(),
                                        variant.getId(),
                                        variant.getProduct().getName(),
                                        variant.getSize(),
                                        variant.getColor(),
                                        variant.getProduct().getBasePrice(), // Original base price
                                        price, // Snapshot price used
                                        qty,
                                        itemSubTotal,
                                        isOutOfStock,
                                        quantityAdjusted));
                }

                BigDecimal finalTotal = subTotal.subtract(cart.getDiscountAmount());
                if (finalTotal.compareTo(BigDecimal.ZERO) < 0) {
                        finalTotal = BigDecimal.ZERO;
                }

                return new CartDto(
                                cart.getId(),
                                cart.getGuestId(),
                                itemDtos,
                                cart.getCouponCode(),
                                cart.getDiscountAmount(),
                                subTotal,
                                finalTotal);
        }
}

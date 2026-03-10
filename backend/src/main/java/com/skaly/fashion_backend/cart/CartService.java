package com.skaly.fashion_backend.cart;

import com.skaly.fashion_backend.common.ResourceNotFoundException;
import com.skaly.fashion_backend.product.ProductService;
import com.skaly.fashion_backend.product.ProductVariant;
import com.skaly.fashion_backend.user.User;
import com.skaly.fashion_backend.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CartService {

        private final CartRepository cartRepository;
        private final CartItemRepository cartItemRepository;
        private final ProductService productService;
        private final UserRepository userRepository;

        @Transactional
        public CartDto getCart(String userEmail) {
                User user = userRepository.findByEmail(userEmail)
                                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

                Cart cart = cartRepository.findByUserId(user.getId())
                                .orElseGet(() -> {
                                        Cart newCart = Cart.builder().user(user).build();
                                        return cartRepository.save(newCart);
                                });

                return mapToDto(cart);
        }

        @Transactional
        public CartDto addToCart(String userEmail, AddToCartRequest request) {
                User user = userRepository.findByEmail(userEmail)
                                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

                Cart cart = cartRepository.findByUserId(user.getId())
                                .orElseGet(() -> cartRepository.save(Cart.builder().user(user).build()));

                ProductVariant variant = productService.getProductVariantById(request.productVariantId());

                Optional<CartItem> existingItem = cart.getItems().stream()
                                .filter(item -> item.getProductVariant().getId().equals(variant.getId()))
                                .findFirst();

                if (existingItem.isPresent()) {
                        CartItem item = existingItem.get();
                        item.setQuantity(item.getQuantity() + request.quantity());
                        // JPA handles save via dirty checking, but explicit save is safe
                } else {
                        CartItem newItem = CartItem.builder()
                                        .cart(cart)
                                        .productVariant(variant)
                                        .quantity(request.quantity())
                                        .build();
                        cart.addItem(newItem);
                }

                Cart savedCart = cartRepository.save(cart);
                return mapToDto(savedCart);
        }

        @Transactional
        public CartDto updateCartItem(String userEmail, UpdateCartRequest request) {
                User user = userRepository.findByEmail(userEmail)
                                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

                Cart cart = cartRepository.findByUserId(user.getId())
                                .orElseThrow(() -> new ResourceNotFoundException("Cart not found"));

                CartItem item = cartItemRepository.findById(request.cartItemId())
                                .filter(i -> i.getCart().getId().equals(cart.getId()))
                                .orElseThrow(() -> new ResourceNotFoundException("Cart Item not found in user's cart"));

                if (request.quantity() <= 0) {
                        cart.removeItem(item);
                } else {
                        item.setQuantity(request.quantity());
                }

                Cart savedCart = cartRepository.save(cart);
                return mapToDto(savedCart);
        }

        @Transactional
        public CartDto removeCartItem(String userEmail, UUID cartItemId) {
                User user = userRepository.findByEmail(userEmail)
                                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

                Cart cart = cartRepository.findByUserId(user.getId())
                                .orElseThrow(() -> new ResourceNotFoundException("Cart not found"));

                CartItem item = cartItemRepository.findById(cartItemId)
                                .filter(i -> i.getCart().getId().equals(cart.getId()))
                                .orElseThrow(() -> new ResourceNotFoundException("Cart Item not found"));

                cart.removeItem(item);
                Cart savedCart = cartRepository.save(cart);
                return mapToDto(savedCart);
        }

        @Transactional
        public void clearCart(String userEmail) {
                User user = userRepository.findByEmail(userEmail)
                                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
                Cart cart = cartRepository.findByUserId(user.getId())
                                .orElseThrow(() -> new ResourceNotFoundException("Cart not found"));
                cart.clearItems();
                cartRepository.save(cart);
        }

        private CartDto mapToDto(Cart cart) {
                List<CartItemDto> itemDtos = cart.getItems().stream()
                                .map(this::mapItemToDto)
                                .collect(Collectors.toList());

                BigDecimal totalAmount = itemDtos.stream()
                                .map(CartItemDto::subtotal)
                                .reduce(BigDecimal.ZERO, BigDecimal::add);

                return new CartDto(cart.getId(), itemDtos, totalAmount);
        }

        private CartItemDto mapItemToDto(CartItem item) {
                ProductVariant variant = item.getProductVariant();
                BigDecimal price = variant.getProduct().getBasePrice();
                if (variant.getPriceAdjustment() != null) {
                        price = price.add(variant.getPriceAdjustment());
                }
                BigDecimal subtotal = price.multiply(BigDecimal.valueOf(item.getQuantity()));

                return new CartItemDto(
                                item.getId(),
                                variant.getId(),
                                variant.getProduct().getName(),
                                variant.getSize(),
                                variant.getColor(),
                                price,
                                item.getQuantity(),
                                subtotal);
        }
}

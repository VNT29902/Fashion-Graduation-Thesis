package com.skaly.fashion_backend.order;

import com.skaly.fashion_backend.cart.CartDto;
import com.skaly.fashion_backend.cart.CartItemDto;
import com.skaly.fashion_backend.cart.CartService;
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
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderService {

        private final OrderRepository orderRepository;
        private final UserRepository userRepository;
        private final CartService cartService;
        private final ProductService productService;

        @Transactional
        public OrderDto placeOrder(String userEmail, PlaceOrderRequest request) {
                User user = userRepository.findByEmail(userEmail)
                                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

                CartDto cart = cartService.getCart(userEmail, null);

                if (cart.items().isEmpty()) {
                        throw new IllegalStateException("Cart is empty");
                }

                Order order = Order.builder()
                                .user(user)
                                .status(OrderStatus.PENDING)
                                .shippingAddress(request.shippingAddress())
                                .build();

                BigDecimal totalAmount = BigDecimal.ZERO;

                for (CartItemDto cartItem : cart.items()) {
                        ProductVariant variant = productService.getProductVariantById(cartItem.productVariantId());

                        // Deduct stock via ProductService (encapsulating logic)
                        productService.reduceStock(variant.getId(), cartItem.quantity());

                        // Calculate price
                        BigDecimal price = variant.getProduct().getBasePrice();
                        if (variant.getPriceAdjustment() != null) {
                                price = price.add(variant.getPriceAdjustment());
                        }

                        OrderItem orderItem = OrderItem.builder()
                                        .order(order)
                                        .productVariant(variant)
                                        .quantity(cartItem.quantity())
                                        .snapshotPrice(price)
                                        .build();
                        order.addItem(orderItem);
                        totalAmount = totalAmount.add(price.multiply(BigDecimal.valueOf(cartItem.quantity())));
                }

                order.setTotalAmount(totalAmount);
                Order savedOrder = orderRepository.save(order);

                // Clear cart
                cartService.clearCart(userEmail, null);

                return mapToDto(savedOrder);
        }

        public List<OrderDto> getUserOrders(String userEmail) {
                User user = userRepository.findByEmail(userEmail)
                                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

                return orderRepository.findByUserId(user.getId()).stream()
                                .map(this::mapToDto)
                                .collect(Collectors.toList());
        }

        private OrderDto mapToDto(Order order) {
                List<OrderItemDto> itemDtos = order.getItems().stream()
                                .map(item -> {
                                        BigDecimal subtotal = item.getSnapshotPrice()
                                                        .multiply(BigDecimal.valueOf(item.getQuantity()));
                                        return new OrderItemDto(
                                                        item.getId(),
                                                        item.getProductVariant().getProduct().getName(),
                                                        item.getProductVariant().getSize(),
                                                        item.getProductVariant().getColor(),
                                                        item.getQuantity(),
                                                        item.getSnapshotPrice(),
                                                        subtotal);
                                })
                                .collect(Collectors.toList());

                return new OrderDto(
                                order.getId(),
                                order.getTotalAmount(),
                                order.getStatus(),
                                order.getShippingAddress(),
                                itemDtos,
                                order.getCreatedAt());
        }
}

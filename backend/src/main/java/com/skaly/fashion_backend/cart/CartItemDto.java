package com.skaly.fashion_backend.cart;

import java.math.BigDecimal;
import java.util.UUID;

public record CartItemDto(
        UUID id,
        UUID productVariantId,
        String productName,
        String size,
        String color,
        BigDecimal price,
        Integer quantity,
        BigDecimal subtotal) {
}

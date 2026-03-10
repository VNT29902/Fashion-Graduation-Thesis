package com.skaly.fashion_backend.cart;

import java.util.UUID;

public record AddToCartRequest(
        UUID productVariantId,
        Integer quantity) {
}

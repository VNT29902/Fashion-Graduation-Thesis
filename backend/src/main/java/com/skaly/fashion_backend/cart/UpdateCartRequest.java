package com.skaly.fashion_backend.cart;

import java.util.UUID;

public record UpdateCartRequest(
        UUID cartItemId,
        Integer quantity) {
}

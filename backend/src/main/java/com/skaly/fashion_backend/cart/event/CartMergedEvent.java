package com.skaly.fashion_backend.cart.event;

import java.util.UUID;

public record CartMergedEvent(
        UUID userId,
        String guestId,
        int mergedItemsCount) {
}

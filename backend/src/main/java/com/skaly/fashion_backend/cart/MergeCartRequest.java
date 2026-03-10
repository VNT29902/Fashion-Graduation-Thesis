package com.skaly.fashion_backend.cart;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class MergeCartRequest {
    @NotBlank(message = "Guest ID is required for merging cart")
    private String guestId;
}

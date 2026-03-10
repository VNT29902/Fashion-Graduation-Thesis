package com.skaly.fashion_backend.cart;

import com.skaly.fashion_backend.common.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/cart")
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;

    @GetMapping
    public ResponseEntity<ApiResponse<CartDto>> getCart(Authentication authentication) {
        return ResponseEntity.ok(ApiResponse.success(cartService.getCart(authentication.getName())));
    }

    @PostMapping("/add")
    public ResponseEntity<ApiResponse<CartDto>> addToCart(
            @RequestBody AddToCartRequest request,
            Authentication authentication) {
        return ResponseEntity.ok(ApiResponse.success(cartService.addToCart(authentication.getName(), request)));
    }

    @PutMapping("/update")
    public ResponseEntity<ApiResponse<CartDto>> updateCartItem(
            @RequestBody UpdateCartRequest request,
            Authentication authentication) {
        return ResponseEntity.ok(ApiResponse.success(cartService.updateCartItem(authentication.getName(), request)));
    }

    @DeleteMapping("/remove/{itemId}")
    public ResponseEntity<ApiResponse<CartDto>> removeCartItem(
            @PathVariable UUID itemId,
            Authentication authentication) {
        return ResponseEntity.ok(ApiResponse.success(cartService.removeCartItem(authentication.getName(), itemId)));
    }

    @DeleteMapping("/clear")
    public ResponseEntity<ApiResponse<Void>> clearCart(Authentication authentication) {
        cartService.clearCart(authentication.getName());
        return ResponseEntity.ok(ApiResponse.success(null));
    }
}

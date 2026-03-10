package com.skaly.fashion_backend.order;

import com.skaly.fashion_backend.common.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @PostMapping("/place")
    public ResponseEntity<ApiResponse<OrderDto>> placeOrder(
            @RequestBody PlaceOrderRequest request,
            Authentication authentication) {
        return ResponseEntity.ok(ApiResponse.success(orderService.placeOrder(authentication.getName(), request)));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<OrderDto>>> getUserOrders(Authentication authentication) {
        return ResponseEntity.ok(ApiResponse.success(orderService.getUserOrders(authentication.getName())));
    }
}

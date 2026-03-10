package com.skaly.fashion_backend.auth;

public record RegisterRequest(
        String firstname,
        String lastname,
        String email,
        String password) {
}

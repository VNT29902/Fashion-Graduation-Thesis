package com.skaly.fashion_backend.auth;

public record AuthenticationRequest(
        String email,
        String password) {
}

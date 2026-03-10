package com.skaly.fashion_backend.auth;

public record AuthenticationResponse(
        String accessToken,
        String refreshToken) {
}

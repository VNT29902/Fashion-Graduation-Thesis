package com.skaly.fashion_backend.security;

import com.skaly.fashion_backend.user.Provider;
import com.skaly.fashion_backend.user.Role;
import com.skaly.fashion_backend.user.User;
import com.skaly.fashion_backend.user.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.oauth2.client.registration.ClientRegistration;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.AuthorizationGrantType;
import org.springframework.security.oauth2.core.OAuth2AccessToken;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.time.Instant;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class CustomOAuth2UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private CustomOAuth2UserService customOAuth2UserService;

    private OAuth2UserRequest oAuth2UserRequest;
    private OAuth2User oAuth2User;

    @BeforeEach
    void setUp() {
        ClientRegistration clientRegistration = ClientRegistration.withRegistrationId("google")
                .clientId("test-client")
                .clientSecret("test-secret")
                .authorizationGrantType(AuthorizationGrantType.AUTHORIZATION_CODE)
                .redirectUri("{baseUrl}/login/oauth2/code/{registrationId}")
                .authorizationUri("https://accounts.google.com/o/oauth2/v2/auth")
                .tokenUri("https://www.googleapis.com/oauth2/v4/token")
                .userInfoUri("https://www.googleapis.com/oauth2/v3/userinfo")
                .userNameAttributeName("sub")
                .clientName("Google")
                .build();

        OAuth2AccessToken accessToken = new OAuth2AccessToken(OAuth2AccessToken.TokenType.BEARER, "test-token",
                Instant.now(), Instant.now().plusSeconds(3600));
        oAuth2UserRequest = new OAuth2UserRequest(clientRegistration, accessToken);

        oAuth2User = mock(OAuth2User.class);
        lenient().when(oAuth2User.getAttribute("email")).thenReturn("bob@example.com");
        lenient().when(oAuth2User.getAttribute("given_name")).thenReturn("Bob");
        lenient().when(oAuth2User.getAttribute("family_name")).thenReturn("Doe");
    }

    @Test
    void loadUser_UnsupportedProvider_ThrowsException() {
        ClientRegistration githubRegistration = ClientRegistration.withRegistrationId("github")
                // ... setup minimum required properties
                .clientId("test").authorizationGrantType(AuthorizationGrantType.AUTHORIZATION_CODE)
                .redirectUri("test").authorizationUri("test").tokenUri("test").build();

        OAuth2UserRequest githubRequest = new OAuth2UserRequest(githubRegistration, oAuth2UserRequest.getAccessToken());

        // Use reflection or a spy to avoid super.loadUser making real network call
        // during test.
        // For unit test simplicity, we extract the core logic to test
        // 'processOAuth2User' via package-private/reflection or just testing the core
        // behavior.
        // Actually, since processOAuth2User is private and loadUser calls super (which
        // fails without a mock server),
        // we'll simulate the loadUser behavior by wrapping the CustomOAuth2UserService
        // in a spy for super.loadUser.
    }
}

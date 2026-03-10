package com.skaly.fashion_backend.auth;

import com.skaly.fashion_backend.security.JwtUtils;
import com.skaly.fashion_backend.user.Provider;
import com.skaly.fashion_backend.user.Role;
import com.skaly.fashion_backend.user.User;
import com.skaly.fashion_backend.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;
    private final AuthenticationManager authenticationManager;

    public AuthenticationResponse register(RegisterRequest request) {
        var user = User.builder()
                .firstName(request.firstname())
                .lastName(request.lastname())
                .email(request.email())
                .passwordHash(passwordEncoder.encode(request.password()))
                .role(Role.USER)
                .provider(Provider.LOCAL)
                .build();

        userRepository.save(user);

        var jwtToken = jwtUtils.generateToken(user);
        return new AuthenticationResponse(jwtToken, null);
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.email(),
                        request.password()));

        var user = userRepository.findByEmail(request.email())
                .orElseThrow(); // Handled by GlobalExceptionHandler technically, or AuthenticationManager
                                // throws BadCreds

        var jwtToken = jwtUtils.generateToken(user);
        return new AuthenticationResponse(jwtToken, null);
    }
}

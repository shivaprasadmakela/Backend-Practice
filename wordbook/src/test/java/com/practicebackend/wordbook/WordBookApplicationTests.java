package com.practicebackend.wordbook;

import com.practicebackend.wordbook.service.JWTService;

import java.util.ArrayList;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class WordBookApplicationTests {

    @Autowired
    private JWTService jwtService; // Inject the JwtService

    @Test
    void contextLoads() {
        // Ensure the Spring context loads without issues
    }

    @Test
    void testGenerateToken() {
        // Test token generation
        String token = jwtService.generateToken("testuser");
        System.out.println("Generated Token: " + token);

        // Optionally, add assertions
        assert token != null && !token.isEmpty();
    }

    @Test
    void testExtractUsername() {
        // Generate a token and extract the username
        String token = jwtService.generateToken("testuser");
        String username = jwtService.extractUsername(token);

        System.out.println("Extracted Username: " + username);

        // Assertions to validate the correctness
        assert username.equals("testuser");
    }

    @Test
    void testValidateToken() {
        // Generate a token and validate it
        String token = jwtService.generateToken("testuser");

        // Mock a UserDetails implementation for testing
        org.springframework.security.core.userdetails.User userDetails =
                new org.springframework.security.core.userdetails.User("testuser", "", new ArrayList<>());

        boolean isValid = jwtService.validateToken(token, userDetails);

        System.out.println("Is Token Valid? " + isValid);

        // Assertion to validate token
        assert isValid;
    }
}

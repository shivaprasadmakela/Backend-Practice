package com.practicebackend.wordbook.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.practicebackend.wordbook.entity.User;
import com.practicebackend.wordbook.service.JWTService;
import com.practicebackend.wordbook.service.UserService;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = {"http://localhost:3000", "https://your-deployment-url.com"})
public class AuthController {

    private final UserService userService;
    private final JWTService JWTService; // Inject JwtUtil bean

    public AuthController(UserService userService, JWTService JWTService) {
        this.userService = userService;
        this.JWTService = JWTService;
    }

    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody User user) {
        User newUser = userService.registerUser(user.getName(), user.getEmail(), user.getPassword());
        return ResponseEntity.ok(newUser);
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody User user) {
        // Authenticate user
        User loggedInUser = userService.loginUser(user.getEmail(), user.getPassword());

        if (loggedInUser != null) {
            // Generate a JWT token
            String token = JWTService.generateToken(loggedInUser.getEmail());
            return ResponseEntity.ok(token);
        }

        return ResponseEntity.status(401).body("Invalid email or password");
    
    }
}

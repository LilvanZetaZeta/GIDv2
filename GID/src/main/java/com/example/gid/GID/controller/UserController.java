package com.example.gid.GID.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;

import com.example.gid.GID.model.User;
import com.example.gid.GID.model.Order;
import com.example.gid.GID.service.UserService;
import com.example.gid.GID.service.OrderService;
import java.util.List;

@SecurityRequirement(name = "bearerAuth")
@RestController
@RequestMapping("/api/v1/users")
public class UserController {

    @Autowired private UserService userService;
    @Autowired private OrderService orderService;

    
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        try {
            return ResponseEntity.ok(userService.register(user));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> creds) {
        try {
            User user = userService.login(creds.get("email"), creds.get("password"));
            return ResponseEntity.ok(Map.of("token", "dummy-token", "user", user));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }

    @GetMapping("/profile")
    public ResponseEntity<User> getUserProfile() {
        return ResponseEntity.ok(userService.getAuthenticatedUserProfile());
    }
    
    @PutMapping("/profile")
    public ResponseEntity<User> updateUserProfile(@RequestBody User userDetails) {
        return ResponseEntity.ok(userService.updateUser(userService.getAuthenticatedUserProfile().getId(), userDetails));
    }
    
    @GetMapping("/profile/orders")
    public ResponseEntity<List<Order>> getMyOrderHistory() {
        User user = userService.getAuthenticatedUserProfile();
        return ResponseEntity.ok(orderService.getUserOrderHistory(user.getId()));
    }

    // --- NUEVOS ENDPOINTS ADMIN (Usuarios) ---
    
    @GetMapping("/admin/all")
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @PutMapping("/admin/{userId}/role")
    public ResponseEntity<?> changeUserRole(@PathVariable Long userId, @RequestBody Map<String, String> payload) {
        try {
            String newRole = payload.get("role");
            return ResponseEntity.ok(userService.changeUserRole(userId, newRole));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }
}

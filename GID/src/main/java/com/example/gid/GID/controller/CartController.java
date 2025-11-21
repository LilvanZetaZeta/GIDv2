package com.example.gid.GID.controller;

import com.example.gid.GID.model.Cart;
import com.example.gid.GID.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    // Endpoint: GET /api/v1/cart/{userId}
    @GetMapping("/{userId}")
    public ResponseEntity<Cart> getCart(@PathVariable Long userId) {
        return ResponseEntity.ok(cartService.getCartByUser(userId));
    }

    // Endpoint: POST /api/v1/cart/{userId}
    @PostMapping("/{userId}")
    public ResponseEntity<Cart> addItem(@PathVariable Long userId, @RequestBody Map<String, Object> payload) {
        Long productId = Long.valueOf(payload.get("productId").toString());
        int quantity = Integer.parseInt(payload.get("quantity").toString());
        return ResponseEntity.ok(cartService.addItem(userId, productId, quantity));
    }

    // Endpoint: DELETE /api/v1/cart/item/{cartItemId}
    @DeleteMapping("/item/{cartItemId}")
    public ResponseEntity<Cart> removeItem(@PathVariable Long cartItemId) {
        return ResponseEntity.ok(cartService.removeItem(cartItemId));
    }
}
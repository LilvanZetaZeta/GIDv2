package com.example.gid.GID.controller;

import com.example.gid.GID.model.Order;
import com.example.gid.GID.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
import java.util.List;

@RestController
@RequestMapping("/api/v1/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    // Endpoint de Checkout: Recibe el userId en la URL
    @PostMapping("/{userId}/checkout")
    public ResponseEntity<Order> checkout(@PathVariable Long userId, @RequestBody Map<String, String> payload) {
        String paymentMethod = payload.get("paymentMethod");
        return ResponseEntity.ok(orderService.createOrderFromCart(userId, paymentMethod));
    }

    @GetMapping("/{orderId}")
    public ResponseEntity<Order> getOrderDetails(@PathVariable Long orderId) {
        return ResponseEntity.ok(orderService.getOrderById(orderId));
    }

    // Endpoints de Admin
    @GetMapping("/admin/all")
    public ResponseEntity<List<Order>> getAllOrders() {
        return ResponseEntity.ok(orderService.getAllOrders());
    }

    @PutMapping("/admin/{orderId}/status")
    public ResponseEntity<?> updateStatus(@PathVariable Long orderId, @RequestBody Map<String, String> payload) {
        // Asume que tu servicio tiene un método updateOrderStatus
        // Si no, ignora esta línea o implementa la lógica simple
        return ResponseEntity.ok(orderService.updateOrderStatus(orderId, payload.get("status")));
    }
}
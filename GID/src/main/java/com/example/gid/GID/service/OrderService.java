package com.example.gid.GID.service;

import com.example.gid.GID.model.*;
import com.example.gid.GID.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class OrderService {

    @Autowired private OrderRepository orderRepository;
    @Autowired private ProductRepository productRepository;
    @Autowired private CartService cartService;
    @Autowired private UserService userService;

    @Transactional
    public Order createOrderFromCart(Long userId, String paymentMethod) {
        User user = userService.getUserById(userId); // Simplificado para el ejemplo
        Cart cart = cartService.getCartByUser(userId);
        
        if (cart.getItems().isEmpty()) {
            throw new RuntimeException("El carrito está vacío");
        }

        Order order = new Order();
        order.setUser(user);
        order.setPaymentMethod(paymentMethod);
        order.setCreatedAt(new Date());
        
        // --- ESTADO INICIAL ---
        order.setStatus(OrderStatus.PENDIENTE); 
        // ----------------------
        
        order.setItems(new ArrayList<>());
        
        double total = 0;
        for (CartItem cartItem : cart.getItems()) {
            Product product = productRepository.findById(cartItem.getProduct().getId())
                    .orElseThrow(() -> new RuntimeException("Producto no encontrado"));

            if (product.getStock() < cartItem.getQuantity()) {
                throw new RuntimeException("Stock insuficiente para: " + product.getName());
            }
            product.setStock(product.getStock() - cartItem.getQuantity());
            productRepository.save(product);

            OrderItem orderItem = new OrderItem();
            orderItem.setOrder(order);
            orderItem.setOriginalProductId(product.getId());
            orderItem.setProductName(product.getName());
            orderItem.setPriceAtPurchase(product.getPrice());
            orderItem.setQuantity(cartItem.getQuantity());
            
            order.getItems().add(orderItem);
            total += product.getPrice() * cartItem.getQuantity();
        }

        order.setTotal(total);
        Order savedOrder = orderRepository.save(order);
        cartService.clearCart(userId);
        return savedOrder;
    }

    public Order getOrderById(Long orderId) {
        return orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Orden no encontrada"));
    }

    public List<Order> getUserOrderHistory(Long userId) {
        User user = userService.getUserById(userId);
        return orderRepository.findByUser(user);
    }
    
    // --- MÉTODOS DE ADMIN ---
    
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public Order updateOrderStatus(Long orderId, String newStatus) {
        Order order = getOrderById(orderId);
        try {
            order.setStatus(OrderStatus.valueOf(newStatus));
            return orderRepository.save(order);
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("Estado inválido: " + newStatus);
        }
    }
}
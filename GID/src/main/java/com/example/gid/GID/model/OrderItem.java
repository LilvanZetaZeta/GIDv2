package com.example.gid.GID.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class OrderItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "order_id")
    @JsonIgnore
    private Order order;

    // Guarda una "foto" de los datos del producto
    private Long originalProductId;
    private String productName;
    private double priceAtPurchase;
    private int quantity;
}
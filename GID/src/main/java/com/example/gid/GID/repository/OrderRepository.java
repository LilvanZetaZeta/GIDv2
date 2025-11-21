package com.example.gid.GID.repository;
import com.example.gid.GID.model.User;
import com.example.gid.GID.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    // CAMBIO CLAVE: Usamos 'findByUser' en lugar de 'findByUserId'
    // Esto es mucho más seguro y evita errores de mapeo en JPA.
    List<Order> findByUser(User user);
}
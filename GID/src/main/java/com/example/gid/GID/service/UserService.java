package com.example.gid.GID.service;

import com.example.gid.GID.model.User;
import com.example.gid.GID.model.Role;
import com.example.gid.GID.model.Order;
import com.example.gid.GID.repository.UserRepository;
import com.example.gid.GID.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import java.util.List;


@Service
public class UserService {

    @Autowired private UserRepository userRepository;
    @Autowired private OrderRepository orderRepository;

    public User getAuthenticatedUserProfile() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado en la sesión"));
    }

    public User register(User user) {
        if (userRepository.findByEmail(user.getEmail()).isPresent()) { 
            throw new RuntimeException("El correo ya está registrado.");
        }
        
        // ... (tus validaciones de Duoc y Password van aquí) ...

        // --- ASIGNACIÓN DE ROL ---
        // Por defecto todos son USER.
        // Solo si el correo es específico, le damos ADMIN (para tu proyecto escolar)
        if (user.getEmail().equals("admin@duocuc.cl")) { // Cambia esto por tu correo de admin
            user.setRole(Role.ADMIN);
        } else {
            user.setRole(Role.USER);
        }
        // -------------------------

        return userRepository.save(user);
    }

    // ... (login, getUserById, updateUser se mantienen igual) ...
    
    public User login(String email, String password) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        if (!user.getPassword().equals(password)) {
            throw new RuntimeException("Contraseña incorrecta");
        }
        return user;
    }

    public User getUserById(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    public User updateUser(Long id, User userDetails) {
        User user = getUserById(id);
        if (user != null) {
            user.setFirstname(userDetails.getFirstname());
            user.setLastname(userDetails.getLastname());
            return userRepository.save(user);
        }
        return null;
    }

    public List<Order> getUserOrderHistory(Long userId) {
        User user = getUserById(userId);
        if (user == null) throw new RuntimeException("Usuario no encontrado");
        return orderRepository.findByUser(user);
    }
    
    // --- NUEVO MÉTODO PARA ADMIN: LISTAR TODOS LOS USUARIOS ---
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
    
    // --- NUEVO MÉTODO PARA ADMIN: CAMBIAR ROL ---
    public User changeUserRole(Long userId, String newRole) {
        User user = getUserById(userId);
        if (user != null) {
            try {
                user.setRole(Role.valueOf(newRole.toUpperCase()));
                return userRepository.save(user);
            } catch (IllegalArgumentException e) {
                throw new RuntimeException("Rol inválido");
            }
        }
        return null;
    }
}
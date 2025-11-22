package com.example.gid.GID.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.List;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    // 1. Tu Password Encoder original (SE QUEDA IGUAL)
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // 2. El filtro de seguridad principal (AQUÍ ESTÁ LA MAGIA)
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            
            // --- PRUEBA DIAGNÓSTICA: Deshabilitar TODA la seguridad ---
            // Si con esto puedes entrar a Swagger, confirma que el problema está en cómo
            // estábamos definiendo las rutas en el authorizeHttpRequests.
            .authorizeHttpRequests(auth -> auth
                .anyRequest().permitAll() // <-- Permite TODO
            );
    
        return http.build();
    }

    // 3. Configuración de CORS Centralizada
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        
        // AQUÍ ESTÁ EL CAMBIO: Agregamos tu URL exacta de Vercel
        configuration.setAllowedOrigins(Arrays.asList(
            "http://localhost:5173",             // Para cuando trabajes en tu PC
            "https://gi-dv2.vercel.app",         // <--- ¡ESTA ES LA QUE FALTABA!
            "https://gi-dv2.vercel.app/"         // (A veces ayuda ponerla con barra al final por si acaso)
        ));
        
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(List.of("*"));
        configuration.setAllowCredentials(true); // Permitir cookies/auth headers

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}

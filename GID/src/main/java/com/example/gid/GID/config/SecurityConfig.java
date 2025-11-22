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
        .authorizeHttpRequests(auth -> auth
            // --- ENDPOINTS PÚBLICOS (SIN AUTENTICACIÓN) ---
            .requestMatchers("/").permitAll()
            // 1. Permitir acceso a los endpoints de registro y login
            .requestMatchers("/api/v1/users/register", "/api/v1/users/login").permitAll()
            
            // 2. <-- ¡IMPORTANTE! Permitir acceso a los productos para que el homepage funcione -->
            .requestMatchers("/api/v1/products/**").permitAll() 
            
            // 3. <-- ¡MÁS EXPLÍCITO! Permitir acceso a toda la documentación de Swagger -->
            .requestMatchers("/doc/swagger-ui.html", "/swagger-ui/**", "/v3/api-docs/**").permitAll()

            // --- ENDPOINTS PRIVADOS (REQUIEREN AUTENTICACIÓN) ---
            // Cualquier otra petición debe estar autenticada
            .anyRequest().authenticated()
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

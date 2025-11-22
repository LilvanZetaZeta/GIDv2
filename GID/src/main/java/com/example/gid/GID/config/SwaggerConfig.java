package com.example.gid.GID.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("API de GID")
                        .version("v1")
                        .description("API para la gestión de usuarios, productos y órdenes")
                )
                // Añade un requisito de seguridad global llamado "bearerAuth"
                .addSecurityItem(new SecurityRequirement().addList("bearerAuth"))
                .components(new Components()
                        // Define el esquema de seguridad "bearerAuth"
                        .addSecuritySchemes("bearerAuth",
                                new SecurityScheme()
                                        .type(SecurityScheme.Type.HTTP)
                                        .scheme("bearer")
                                        .bearerFormat("JWT")
                        )
                );
    }
}

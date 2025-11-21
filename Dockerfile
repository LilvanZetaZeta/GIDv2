# --- ETAPA 1: CONSTRUCCIÓN (BUILD) ---
# Usamos una imagen que ya tiene Maven y Java 21 instalados
FROM maven:3.9-eclipse-temurin-21 AS build

# Copiamos todo tu proyecto dentro de la imagen
COPY . /app

# Nos movemos a la carpeta donde está tu Backend
WORKDIR /app/GID

# Ejecutamos el comando de compilación (usando el Maven de la imagen, no el tuyo)
RUN mvn clean package -DskipTests

# --- ETAPA 2: EJECUCIÓN (RUN) ---
# Usamos una imagen ligera solo con Java para correr la app
FROM eclipse-temurin:21-jdk

# Copiamos el archivo .jar que se creó en la etapa anterior
COPY --from=build /app/GID/target/*.jar app.jar

# Le decimos a Render qué comando ejecutar al encender
ENTRYPOINT ["java", "-jar", "/app.jar"]

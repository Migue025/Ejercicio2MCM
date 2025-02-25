# Usamos una imagen base que tenga Java 21 (JRE)
FROM eclipse-temurin:21-jre-alpine

# Argumento para indicar el JAR generado
ARG JAR_FILE=target/*.jar

# Copiamos el JAR al contenedor
COPY ${JAR_FILE} app.jar

# Especificamos el comando para ejecutar la aplicación
ENTRYPOINT ["java", "-jar", "/app.jar"]

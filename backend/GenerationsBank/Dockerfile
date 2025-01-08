# Use a base image with JDK installed (openjdk is a good choice for Java-based apps)
FROM openjdk:23-jdk


ENV SPRING_DATASOURCE_URL=jdbc:postgresql://generationsbank_db:5432/generationsbank_db
ENV SPRING_DATASOURCE_USERNAME=GenerationsBankCustomer
ENV SPRING_DATASOURCE_PASSWORD=GenerationsBankCustomer

# Copy the JAR file from your local machine to the container
COPY target/GenerationsBank-0.0.1-SNAPSHOT.jar /app/GenerationsBank-0.0.1-SNAPSHOT.jar

# Expose the port your application will run on
EXPOSE 8080

# Run the Spring Boot application
ENTRYPOINT ["java", "-jar", "/app/GenerationsBank-0.0.1-SNAPSHOT.jar"]




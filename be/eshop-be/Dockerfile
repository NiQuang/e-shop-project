# syntax =docker/dockerfile:1
FROM openjdk:8
#ARG JAR_FILE=target/*.jar
#COPY ${JAR_FILE} app.jar
#EXPOSE 8787
#ENTRYPOINT["java","-jar","/app.jar"]

WORKDIR /app
COPY .mvn/ .mvn
COPY mvnw pom.xml ./
RUN ./mvnw dependency:go-offline
COPY src ./src
CMD ["./mvnw","spring-boot:run"]
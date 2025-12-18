FROM eclipse-temurin:21-jdk AS builder

WORKDIR /app
COPY guestbook/ .

RUN sed -i 's/\r$//' gradlew
RUN chmod +x gradlew
RUN ./gradlew clean bootJar -x test

FROM eclipse-temurin:21-jdk

WORKDIR /app
COPY --from=builder /app/build/libs/*.jar app.jar

ENTRYPOINT ["java", "-jar", "app.jar"]
FROM openjdk:8-jdk-alpine

COPY target/kafka-streams-avro-to-json-1.0-SNAPSHOT-jar-with-dependencies.jar app.jar

ENTRYPOINT ["java", "-jar", "/app.jar"]

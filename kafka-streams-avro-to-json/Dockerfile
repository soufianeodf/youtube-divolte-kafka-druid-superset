FROM openjdk:8-jdk-alpine
COPY ./kafka-streams-avro-to-json/target/kafka-streams-avro-to-json-1.0-SNAPSHOT-jar-with-dependencies.jar app.jar
COPY ./kafka-streams-avro-to-json/src/main/resources/application.properties /config/
COPY ./kafka-streams-avro-to-json/myentrypoint.sh /
CMD ["sh", "/myentrypoint.sh"]
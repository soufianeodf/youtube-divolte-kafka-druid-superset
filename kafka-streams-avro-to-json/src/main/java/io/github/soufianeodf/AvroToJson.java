package io.github.soufianeodf;

import java.io.*;
import java.util.Properties;

import lombok.SneakyThrows;
import org.apache.avro.Schema;
import org.apache.avro.io.BinaryDecoder;
import org.apache.avro.io.DecoderFactory;
import org.apache.avro.specific.SpecificDatumReader;
import org.apache.kafka.clients.consumer.ConsumerConfig;
import org.apache.kafka.common.serialization.Serdes;
import org.apache.kafka.streams.KafkaStreams;
import org.apache.kafka.streams.StreamsConfig;
import org.apache.kafka.streams.kstream.KStream;
import org.apache.kafka.streams.kstream.KStreamBuilder;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class AvroToJson {

    private static final String INPUT_TOPIC = "input.topic";
    private static final String OUTPUT_TOPIC = "output.topic";
    private static final Properties prop = new Properties();
    private static final Logger logger = LoggerFactory.getLogger(AvroToJson.class.getName());

    static {
        try {
            prop.load(readFile("application.properties"));
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public static void main(String[] args) {
        Properties config = kafkaStreamsConfig();

        KStreamBuilder builder = new KStreamBuilder();
        KStream<String, byte[]> textLines = builder.stream(prop.getProperty(AvroToJson.INPUT_TOPIC));
        KStream<String, String> stringStringKStream = textLines.mapValues(AvroToJson::avroToJson);
        stringStringKStream.to(Serdes.String(), Serdes.String(), prop.getProperty(AvroToJson.OUTPUT_TOPIC));
        KafkaStreams streams = new KafkaStreams(builder, config);
        streams.start();
        Runtime.getRuntime().addShutdownHook(new Thread(streams::close));
    }

    private static Properties kafkaStreamsConfig() {
        Properties config = new Properties();
        config.put(StreamsConfig.APPLICATION_ID_CONFIG, prop.getProperty(StreamsConfig.APPLICATION_ID_CONFIG));
        config.put(StreamsConfig.BOOTSTRAP_SERVERS_CONFIG, prop.getProperty(StreamsConfig.BOOTSTRAP_SERVERS_CONFIG));
        config.put(ConsumerConfig.AUTO_OFFSET_RESET_CONFIG, prop.getProperty(ConsumerConfig.AUTO_OFFSET_RESET_CONFIG));
        config.put(StreamsConfig.DEFAULT_KEY_SERDE_CLASS_CONFIG, Serdes.String().getClass());
        config.put(StreamsConfig.DEFAULT_VALUE_SERDE_CLASS_CONFIG, Serdes.ByteArray().getClass());
        return config;
    }

    private static InputStream readFile(String fileName) {
        ClassLoader classLoader = AvroToJson.class.getClassLoader();
        return classLoader.getResourceAsStream(fileName);
    }

    @SneakyThrows
    private static String avroToJson(byte[] textLine) {
        Schema.Parser parser = new Schema.Parser();
        Schema schema = parser.parse(readFile("MyEventRecord.avsc"));

        SpecificDatumReader<Object> datumReader = new SpecificDatumReader<>(schema);
        ByteArrayInputStream is = new ByteArrayInputStream(textLine);
        BinaryDecoder binaryDecoder = DecoderFactory.get().binaryDecoder(is, null);
        Object log = datumReader.read(null, binaryDecoder);

        assert log != null;
        logger.info(log.toString());

        return log.toString();
    }
}

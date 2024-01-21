import { Kafka, Producer } from 'kafkajs';
import * as process from "process";

class KafkaClient {
    private producer: Producer;

    constructor() {
        const kafka = new Kafka({
            clientId: process.env.CLIENT_KAFKA_ID,
            brokers: [process.env.CLIENT_KAFKA_BROKERS || 'kafka:9092']
        });
        this.producer = kafka.producer();
    }

    async connect() {
        await this.producer.connect();
    }

    async sendMessage(topic: string, messages: any[]) {
        await this.producer.send({ topic, messages });
    }

    async disconnect() {
        await this.producer.disconnect();
    }
}

export default KafkaClient;

import { Kafka, Producer } from 'kafkajs';

class KafkaClient {
    private producer: Producer;

    constructor() {
        const kafka = new Kafka({
            clientId: 'task-service',
            brokers: ['kafka:9092'] //TODO: move to env
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

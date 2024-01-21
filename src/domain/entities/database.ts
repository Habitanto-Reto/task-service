import mongoose from 'mongoose';

export class Database {
    private readonly mongoUri: string;

    constructor(mongoUri: string) {
        this.mongoUri = mongoUri;
    }

    async connect() {
        console.log('🛢 Conectando a MongoDB🍃...');
        try {
            await mongoose.connect(this.mongoUri);
            return console.log('Conexión a MongoDB🍃 establecida 🟢');
        } catch (err) {
            return console.error('Error conectando a MongoDB ⛔', err, `URI: ${this.mongoUri}`);
        }
    }
}
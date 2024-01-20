import TaskDatasourceImpl from "./infrastructure/datasources/taskDatasourceImpl";
import TaskService from "./services/taskService";
import TaskController from "./presentation/taskControllers";
import TaskRepositoryImpl from "./infrastructure/repositories/taskRepositoryImpl";
import express from 'express';
import {Database} from "./domain/entities/database";
import {jwtMiddleware} from "./infrastructure/jwtMiddleware";

export class Server {
    private app: express.Express;
    private readonly port: number | string;
    private database: Database;

    constructor(port: number | string, database: Database) {
        this.app = express();
        this.port = port;
        this.database = database;
        this.app.use(express.json());

        const dataSource = new TaskDatasourceImpl();
        const repository = new TaskRepositoryImpl(dataSource);
        const service = new TaskService(repository);
        const controller = new TaskController(service);

        this.app.post('/task', jwtMiddleware, (req, res) => controller.createTask(req, res));
        this.app.put('/task', jwtMiddleware, (req, res) => controller.updateTask(req, res));
        this.app.delete('/task/:taskId', jwtMiddleware, (req, res) => controller.removeTask(req, res));
        this.app.get('/tasks', jwtMiddleware, (req, res) => controller.getTasks(req, res));
    }

    async start() {
        console.log('⏳ Server starting...');
        try {
            await this.database.connect();
            this.app.listen(this.port, () => {
                console.log(`🚀 Server running on port ${this.port}`);
            });
        } catch (err) {
            console.error('🔥 Error al iniciar el servidor:', err);
        }
    }
}
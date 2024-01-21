import { Request, Response } from 'express';
import TaskService from "../services/taskService";
import {RequestWithUser} from "../infrastructure/jwtMiddleware";

class TaskController {
    private taskService: TaskService;

    constructor(taskService: TaskService) {
        this.taskService = taskService;
    }

    async createTask(req: Request, res: Response) : Promise<Response> {
        try {
            const task = await this.taskService.createTask(req.body, (req as RequestWithUser).user?.id);

            if (task === null) {
                return res.status(400).json({ message: 'Error creating a task' });
            }
            return res.status(201).json({ message: 'Task successfully created' });
        } catch (error) {
            return res.status(400).json({ message: (error as Error).message });
        }
    }

    async updateTask(req: Request, res: Response) : Promise<Response> {
        try {
            const task = await this.taskService.updateTask(req.body, (req as RequestWithUser).user?.id);

            if (task === null) {
                return res.status(400).json({ message: 'Task does not exist' });
            }

            return res.status(201).json({ message: 'Task successfully updated' });
        } catch (error) {
            return res.status(400).json({ message: (error as Error).message });
        }
    }

    async removeTask(req: Request, res: Response) : Promise<Response> {
        try {
            const { taskId } = req.params;
            await this.taskService.removeTask(taskId, (req as RequestWithUser).user?.id);
            return res.status(200).json({ message: 'Task successfully removed' });
        } catch (error) {
            return res.status(400).json({ message: (error as Error).message });
        }
    }


    async getTasks(req: Request, res: Response): Promise<Response> {
        try {
            const pageNumber = parseInt(req.query.pageNumber as string) || 1;
            const pageSize = parseInt(req.query.pageSize as string) || 10;
            const name = typeof req.query.name === 'string' ? req.query.name : undefined;
            const email = typeof req.query.email === 'string' ? req.query.email : undefined;

            const filter = { pageNumber, pageSize, ...(name && { name }), ...(email && { email }) };
            const { tasks, total } = await this.taskService.getTasks(filter);

            const totalPages = Math.ceil(total / pageSize);
            const nextPage = pageNumber < totalPages ? pageNumber + 1 : null;
            const prevPage = pageNumber > 1 ? pageNumber - 1 : null;

            return res.status(200).json({
                currentPage: pageNumber,
                pageSize,
                totalPages,
                totalRecords: total,
                nextPage,
                prevPage,
                items: tasks
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Error al recuperar las tareas", error: (error as Error).message });
        }
    }

}


export default TaskController;
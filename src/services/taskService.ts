import {TaskRepository} from "../domain/repositories/taskRepository";
import {ITask} from "../domain/entities/ITask";
import {ITaskFilter} from "../domain/entities/ITaskFilter";

class TaskService {
    private repository: TaskRepository;

    constructor(repository: TaskRepository) {
        this.repository = repository;
    }

    async createTask(task: ITask, creatorUserId: string): Promise<void> {
        try{
            //TODO: validate assigneeUserId exists
            task.creatorUserId = creatorUserId;
            await this.repository.saveTask(task);
        }catch (e) {
            throw new Error(`Error creating task ${(e as Error).message}`);
        }
    }

    async updateTask(task: ITask, userOwn: string): Promise<ITask | null> {
        const existingTask = await this.repository.getTaskById(task.uuid);
        if (!existingTask) {
            throw new Error('Task not found');
        }

        if (existingTask.creatorUserId !== userOwn) {
            throw new Error('Unauthorized: You are not allowed to update this task');
        }

        await this.repository.updateTask(task);
        return task;
    }


    async removeTask(taskId: string, ownId: string): Promise<void> {

        const existingTask = await this.repository.getTaskById(taskId);
        if(!existingTask){
            throw new Error('Task not found');
        }

        if (existingTask.creatorUserId !== ownId) {
            throw new Error('Unauthorized: You are not allowed to remove this task');
        }

        if (!existingTask.isCompleted) {
            throw new Error('Task is not completed');
        }

        return this.repository.removeTask(taskId);
    }
    //TODO: mark as completed

    async getTasks(filter: ITaskFilter): Promise<ITask[] | null> {
        try{
            return this.repository.getTasks(filter);
        }catch (e) {
            throw new Error('Error getting tasks');
        }
    }

    async getTaskById(taskId: string): Promise<ITask | null> {
        try{
            return this.repository.getTaskById(taskId);
        }catch (e) {
            throw new Error('Error getting task');
        }
    }
}

export default TaskService;
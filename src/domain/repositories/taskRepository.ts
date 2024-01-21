import {ITask} from "../entities/ITask";
import {ITaskFilter} from "../entities/ITaskFilter";

export abstract class TaskRepository {
    abstract saveTask(task: ITask): Promise<void>;
    abstract updateTask(task: ITask): Promise<void>;
    abstract removeTask(taskId: string): Promise<void>;
    abstract getTasks(filter: ITaskFilter): Promise<{ tasks: ITask[], total: number }>;
    abstract getTaskById(taskId: string): Promise<ITask | null>;
}
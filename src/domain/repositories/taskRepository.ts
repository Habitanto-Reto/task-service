import {ITask} from "../entities/ITask";

export abstract class TaskRepository {
    abstract saveTask(task: ITask): Promise<void>;
    abstract updateTask(task: ITask): Promise<void>;
    abstract removeTask(taskId: string): Promise<void>;
    abstract getTasks(filter: TaskFilter): Promise<ITask[]>;
}
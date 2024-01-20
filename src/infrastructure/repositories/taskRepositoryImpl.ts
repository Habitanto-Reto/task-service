import {TaskRepository} from "../../domain/repositories/taskRepository";
import TaskDatasourceImpl from "../datasources/taskDatasourceImpl";
import {ITask} from "../../domain/entities/ITask";
import {ITaskFilter} from "../../domain/entities/ITaskFilter";

class TaskRepositoryImpl extends TaskRepository {
    private taskDataSource: TaskDatasourceImpl;
    constructor(taskDataSource: TaskDatasourceImpl) {
        super();
        this.taskDataSource = taskDataSource;
    }
    async saveTask(task: ITask): Promise<void> {
        await this.taskDataSource.saveTask(task);
    }
    async updateTask(task: ITask): Promise<void> {
        await this.taskDataSource.updateTask(task);
    }
    async removeTask(taskId: string): Promise<void> {
        await this.taskDataSource.removeTask(taskId);
    }
    async getTasks(filter: ITaskFilter): Promise<{ tasks: ITask[], total: number }> {
        return await this.taskDataSource.getTasks(filter);
    }

    async getTaskById(taskId: string): Promise<ITask | null> {
        return await this.taskDataSource.getTaskById(taskId);
    }
}

export default TaskRepositoryImpl;
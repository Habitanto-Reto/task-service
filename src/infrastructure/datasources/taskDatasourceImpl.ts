import {TaskDataSource} from "../../domain/datasources/taskDatasource";
import Task, {ITask} from "../../domain/entities/ITask";
import {ITaskFilter} from "../../domain/entities/ITaskFilter";

class TaskDatasourceImpl implements TaskDataSource {

    async saveTask(task: ITask): Promise<void> {
        const newTask = new Task(task);
        await newTask.save();
    }
    async updateTask(task: ITask) {
        await Task.updateOne({ uuid: task.uuid }, task);
    }
    async removeTask(taskId: string) {
        await Task.deleteOne({ uuid: taskId });
    }
    async getTasks(filter: ITaskFilter): Promise<{ tasks: ITask[], total: number }> {
        let query: { [key: string]: any } = {};

        if (filter.creatorUserId) {
            query['creatorUserId'] = filter.creatorUserId;
        }

        if (filter.assigneeUserId) {
            query['assigneeUserId'] = filter.assigneeUserId;
        }

        const skip = (filter.pageNumber - 1) * filter.pageSize;
        const limit = filter.pageSize;

        try {
            const total = await Task.countDocuments(query).exec();
            const tasks = await Task.find(query)
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit)
                .exec();

            return { tasks, total };
        } catch (error) {
            throw new Error(`Error retrieving tasks: ${(error as Error).message}`);
        }
    }
    async getTaskById(taskId: string) : Promise<ITask | null>  {
        return Task.findOne({uuid: taskId});
    }
}

export default TaskDatasourceImpl;
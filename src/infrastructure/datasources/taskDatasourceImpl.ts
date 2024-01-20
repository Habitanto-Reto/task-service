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
    async getTasks(filter: ITaskFilter): Promise<ITask[]> {
        let query: { [key: string]: any } = {};

        if (filter.name) {
            query['name'] = { $regex: filter.name, $options: 'i' };
        }

        if (filter.email) {
            query['email'] = filter.email;
        }

        const skip = (filter.pageNumber - 1) * filter.pageSize;
        const limit = filter.pageSize;

        try {
            return await Task.find(query)
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit)
                .exec();
        } catch (error) {
            throw new Error(`Error retrieving tasks: ${(error as Error).message}`);
        }
    }
    async getTaskById(taskId: string) : Promise<ITask | null>  {
        return Task.findOne({uuid: taskId});
    }
}

export default TaskDatasourceImpl;
import mongoose, { Schema, Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export interface ITask extends Document {
    title: string;
    creatorUserId: string;
    assigneeUserId: string;
    isCompleted: boolean;
    createdDate: Date;
    completedDate: Date;
}

const TaskSchema: Schema = new Schema({
    uuid: { type: String, default: uuidv4 },
    title: { type: String, required: true },
    creatorUserId: { type: String, required: true },
    assigneeUserId: { type: String, required: true },
    isCompleted: { type: Boolean, required: true },
    createdDate: { type: Date, required: true },
    completedDate: { type: Date, required: true }
});

export default mongoose.model<ITask, mongoose.Model<ITask>>('Task', TaskSchema);
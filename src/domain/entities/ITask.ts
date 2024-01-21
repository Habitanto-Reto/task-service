import mongoose, { Schema, Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export interface ITask extends Document {
    uuid: string;
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
    isCompleted: { type: Boolean, required: false },
    createdDate: { type: Date, default: Date.now  },
    completedDate: { type: Date, required: false }
});

export default mongoose.model<ITask, mongoose.Model<ITask>>('Task', TaskSchema);
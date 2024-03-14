import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
    description: { type: String, required: true },
    user: { type: mongoose.Schema.ObjectId, ref: "user" },
    project: { type: mongoose.Schema.ObjectId, ref: "project" },
    priority: { type: String, required: true },
    status : { type: String, required: true },
    dueDate: { type: String, required: true },
    dueTime: { type: String, required: true },
});

export const Task = mongoose.model("task", TaskSchema);

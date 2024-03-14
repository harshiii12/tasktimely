import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    users: { type: [mongoose.Schema.ObjectId], ref: "user" },
});

export const Project = mongoose.model("project", ProjectSchema);

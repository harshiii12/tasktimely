import express from "express";
import isAuthenticated from "../../middlewares/isAuthenticated";
import { Task } from "./task.model";
import { Project } from "../project/project.model";

const taskRouter = express.Router();

taskRouter.post("/", isAuthenticated, async function (req, res, next) {
    try {
        const { description, priority, dueDate, dueTime, project, user } = req?.body;
        if (!description || !priority || !dueDate || !dueTime || !project || !user)
            return res.status(400).json({ error: true, message: "invalid inputs" });
        const task = new Task({
            description,
            priority,
            dueDate,
            dueTime,
            project,
            user,
            status: "pending",
        });
        await task.save();
        return res.json(task);
    } catch (error) {
        res.status(500).json({ error: true, message: "server error" });
    }
});

// taskRouter.get("/pending", isAuthenticated, async function (req, res, next) {
//     try {
//         console.log(req.user)
//         const pendingTasks = await Task.find({
//             user: req.user._id,
//             status: "pending",
//         }).populate('project')
//         return res.json(pendingTasks);
//     } catch (error) {
//         res.status(500).json({ error: true, message: "server error" });
//     }
// });

taskRouter.get("/:id", isAuthenticated, async function (req, res, next) {
    try {
        const { id } = req.params;
        const project = await Project.findById(id);
        if (!project) return res.status(404).json({ error: true, message: "invalid projectid" });
        const tasks = await Task.find({ project: id }).populate("user");
        let ret = {
            pending: [],
            completed: [],
        };
        if (!tasks) return res.json(ret);
        for (let task of tasks) {
            if (task.status == "pending") {
                // @ts-ignore
                ret.pending.push(task);
            } else {
                // @ts-ignore
                ret.completed.push(task);
            }
        }
        return res.json(ret);
    } catch (error) {
        res.status(500).json({ error: true, message: "server error" });
    }
});
taskRouter.delete("/:id", isAuthenticated, async function (req, res, next) {
    try {
        const { id } = req.params;
        await Task.deleteOne({ _id: id });
        return res.json({ deleted: true, message: "deleted task" });
    } catch (error) {
        res.status(500).json({ error: true, message: "server error" });
    }
});

taskRouter.post("/toggleStatus/:id", async function (req, res, next) {
    try {
        const { id } = req.params;
        const task = await Task.findById(id);
        console.log(task);
        if (!task) return res.json({ error: true, message: "invalid taskid" });
        if (task.status == "pending") {
            task.status = "completed";
        } else {
            task.status = "pending";
        }
        await task.save();
        console.log(task);
        return res.json(task);
    } catch (error) {
        res.status(500).json({ error: true, message: "server error" });
    }
});

export { taskRouter };

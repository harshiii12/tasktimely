import express from "express";
import { signJwt } from "../../utils/jwt";
import bcrypt from "bcrypt";
import { Project } from "./project.model";
import isAuthenticated from "../../middlewares/isAuthenticated";
import { User } from "../user/user.model";

const projectRouter = express.Router();

projectRouter.post("/", isAuthenticated, async function (req, res, next) {
    try {
        const { name, description } = req?.body;
        if (!description || !name) return res.status(400).json({ error: true, message: "invalid inputs" });
        const project = new Project({ name, description, users: [req.user._id] });
        await project.save();
        return res.json(project);
    } catch (error) {
        res.status(500).json({ error: true, message: "server error" });
    }
});
projectRouter.get("/:id", isAuthenticated, async function (req, res, next) {
    try {
        const { id } = req.params;
        const project = await Project.findById(id).populate("users");
        if (!project) return res.json({ error: true, message: "invalid inputs" });
        return res.json(project);
    } catch (error) {
        res.status(500).json({ error: true, message: "server error" });
    }
});
projectRouter.get("/", isAuthenticated, async function (req, res, next) {
    try {
        console.log(req.user)
        const project = await Project.find({ users: req.user._id }).populate('users');
        return res.json(project);
    } catch (error) {
        res.status(500).json({ error: true, message: "server error" });
    }
});
projectRouter.post("/people/:projectId", isAuthenticated, async function (req, res, next) {
    try {
        const {email} = req.body
        const {projectId} = req.params
        if (!email) return res.status(400).json({ error: true, message: "invalid inputs" });
        const project = await Project.findById(projectId);
        if (!project) return res.status(404).json({ error: true, message: "invalid project" });
        const user = await User.findOne({email})
        if (!user) return res.status(404).json({ error: true, message: "invalid user" });
        project.users.push(user._id)
        await project.save()
        return res.json(user);
    } catch (error) {
        res.status(500).json({ error: true, message: "server error" });
    }
});

export { projectRouter };

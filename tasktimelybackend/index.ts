import express, { NextFunction, Request, Response } from "express";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import { userRouter } from "./modules/user/user.routes";
import { projectRouter } from "./modules/project/project.routes";
import { taskRouter } from "./modules/task/task.routes";
import { TReqUser } from "./modules/user/user.model";
import cors from "cors";

declare global {
    namespace Express {
        interface Request {
            user: TReqUser;
        }
    }
}

async function connectToDatabase() {
    await mongoose.connect(
        "mongodb+srv://admin:admin@cluster0.d8p0gq7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    );
}

const app = express();
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());

app.use(cookieParser());
app.use("/user", userRouter);
app.use("/project", projectRouter);
app.use("/task", taskRouter);

app.listen(4000, async () => {
    try {
        await connectToDatabase();
        console.log("Connected to database!");
        console.log("App on 4000");
    } catch (error) {
        console.log("Coulnd not connect to database!");
    }
});

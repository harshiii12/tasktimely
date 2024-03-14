import express from "express";
import { User } from "./user.model";
import { signJwt } from "../../utils/jwt";
import bcrypt from "bcrypt";
import isAuthenticated from "../../middlewares/isAuthenticated";

const userRouter = express.Router();

userRouter.post("/register", async function (req, res, next) {
    try {
        const { email, password, name } = req?.body;
        if (!email || !password || !name)
            return res.status(400).json({ error: true, message: "invalid inputs" });
        const passwordHash = bcrypt.hashSync(password, 10);
        const user = new User({ email, password: passwordHash, name });
        await user.save();
        const token = signJwt({ id: user._id.toString() });
        return res
            .cookie("token", token, {
                maxAge: 2073600000,
                sameSite: "lax",
                secure: false,
                expires: new Date(Date.now() + 2073600000),
                httpOnly: true,
            })
            .json(user);
    } catch (error) {
        res.json({ error: true, message: "server error" });
    }
});

userRouter.post("/login", async function (req, res, next) {
    try {
        const { email, password } = req?.body;
        if (!email || !password) return res.json({ error: true, message: "invalid inputs" });
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ error: true, message: "invalid credentials" });
        const compare = bcrypt.compareSync(password, user.password);
        if (!compare) return res.status(400).json({ error: true, message: "invalid credentials" });
        const token = signJwt({ id: user._id.toString() });
        return res
            .cookie("token", token, {
                maxAge: 2073600000,
                sameSite: "lax",
                secure: false,
                expires: new Date(Date.now() + 2073600000),
                httpOnly: true,
            })
            .json(user);
    } catch (error) {
        res.json({ error: true, message: "server error" });
    }
});

userRouter.post("/logout", async function (req, res, next) {
    try {
        return res
            .cookie("token", "", {
                maxAge: 2073600000,
                sameSite: "lax",
                secure: false,
                expires: new Date(Date.now() + 2073600000),
                httpOnly: true,
            })
            .json("logged out");
    } catch (error) {
        res.json({ error: true, message: "server error" });
    }
});

userRouter.get("/auth", isAuthenticated, async function (req, res, next) {
    try {
        return res.json(req.user);
    } catch (error) {
        res.json({ error: true, message: "server error" });
    }
});

export { userRouter };

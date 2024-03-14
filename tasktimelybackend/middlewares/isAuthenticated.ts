import { NextFunction, Request, Response } from "express";
import { User } from "../modules/user/user.model";
import { readJwt } from "../utils/jwt";


const isAuthenticated = async function (req:Request, res:Response, next:NextFunction) {
    let token = req.cookies?.token;
    if (!token) token = req.headers?.authorization?.split(" ")[1];
    if (!token) return res.status(403).json({error: true, message :"not authenticated"})
    const id = readJwt(token)
    const user = await User.findById(id);
    if (!user) return res.status(403).json({error: true, message :"not authenticated"})
    req.user = user;
    return next();
};

export default isAuthenticated;

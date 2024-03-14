import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
})

export type TReqUser = {
    _id : mongoose.Types.ObjectId,
    name: string,
    email : string,
    password: string
}

export const User = mongoose.model("user", UserSchema)
import mongoose, { Schema, model } from "mongoose";

export interface UserType  {
    username: string,
    email: string,
    password: string,
    profilePic: string
}
const UserSchema = new Schema<UserType >({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePic: { type: String, default: "" }
}, { timestamps: true })


export const UserModel = model<UserType >("user", UserSchema)
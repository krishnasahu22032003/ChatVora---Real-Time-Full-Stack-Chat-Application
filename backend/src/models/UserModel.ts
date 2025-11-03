import mongoose, { Schema, model } from "mongoose";

export interface UserType  {
    username: string,
    email: string,
    password: string,
    ProfilePic: string
}
const UserSchema = new Schema<UserType >({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    ProfilePic: { type: String, default: "" }
}, { timestamps: true })


export const UserModel = model<UserType >("user", UserSchema)
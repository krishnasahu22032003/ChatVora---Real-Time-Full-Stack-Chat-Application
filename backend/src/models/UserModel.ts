import mongoose, { Schema,model } from "mongoose";

interface user {
    username:string,
    email:string,
    password:string
}
 const UserSchema = new Schema<user>({
    username:{type:String,required:true},
    email:{type:String , required:true , unique:true},
    password:{type:String , required:true}
})


export const UserModel = model ("user",UserSchema)
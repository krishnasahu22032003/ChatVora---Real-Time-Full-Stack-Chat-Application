import { UserModel } from "../models/UserModel.js";
import { ENV } from "../lib/ENV.js";
import jwt from "jsonwebtoken"
import type { NextFunction } from "express";
import type { Socket } from "socket.io";
import JWT_SECRET from "../config/config.js";
import type { JwtPayload } from "jsonwebtoken";
import type mongoose from "mongoose";

interface CustomJwtPayload extends JwtPayload {
  userId: string | mongoose.Types.ObjectId;
}

export const socketauthmiddleware = async (socket:Socket,next:NextFunction)=>{

try{
const token =  socket.handshake.headers.cookie?.split("; ").find((row)=>row.startsWith("jwt="))?.split("=")[1]
if(!token){
    console.log("token not present")
   return next(new Error("No Token Provided"))
}
const decoded = jwt.verify(token,JWT_SECRET as string) as CustomJwtPayload
if(!decoded){
    console.log("Invalid Token")
    return next(new Error("Unauthorized  Invalid token"))
}

const user = await UserModel.findById(decoded.userId).select("-password")
if(!user){
    console.log("User not Found")
    return next(new Error("Invalid User"))
}
 
 socket.user=user 
 socket.userId=user._id.toString()
 console.log(`socket authenticated for user ${user.username} (${user._id})`)
 next()
}catch(e){
console.log("Error in socket Authentication",(e as Error).message)
return next(new Error ("Unauthorized Authentication Failed"))
}


}
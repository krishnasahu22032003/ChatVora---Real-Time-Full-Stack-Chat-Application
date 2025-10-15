import type { Request, Response } from "express"
import bcrypt from "bcrypt"
import z, { success } from "zod"
import { UserModel } from "../models/UserModel.js"
import jwt from "jsonwebtoken"
import JWT_SECRET from "../config/config.js"


export const UserSignUp = async (req: Request, res: Response) => {

    const reqiredbody = z.object({
        username: z.string().min(3).max(50),
        email: z.string().email().min(5).max(50),
        password: z.string().min(8).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/,"Password must include uppercase, lowercase, number, and special character"),
    })

const parseddata = reqiredbody.safeParse(req.body)

if(!parseddata.success){
    return res.status(400).json({
        message: "validation failed",
        success: false,
        errors:parseddata.error.format()
    })
}
const {username,email,password} = parseddata.data

if(await UserModel.findOne({email})){
return res.status(409).json({
    success:false,
    message:"user with this email already exists"
})
}

const hashedpassword = await bcrypt.hash(password,10)

try{
    await UserModel.create({username,email,password:hashedpassword})
    return res.status(201).json({
        success:true,
        message:"user created in database"

    })
}catch(e){
    console.log("singup error",(e as Error).message)
    return res.status(500).json({
        success:false,
        message:"signup failed"
    })
}

}
export async function UserLogIn(req: Request, res: Response) {

const requiredbody = z.object({
    email: z.string().email().min(3).max(50),
    password: z.string().min(8).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/,"Password must include uppercase, lowercase, number, and special character")
})

const parseddata = requiredbody.safeParse(req.body)

if(!parseddata.success){
    return res.status(400).json({
        success:false,
        message:"email and password are required"
    })
}
const {email,password}= parseddata.data
try{
    const user = await UserModel.findOne({email})
    if(!user){
        return res.status(403).json({
            success:false,
            message:"user does not exists , please signup first"
        })
    }

const ok = await bcrypt.compare(password,user.password)
if(!ok){
    return res.status(403).json({
        success:false,
        message:"wrong password"
    })
}
 const token = jwt.sign({id:user._id},JWT_SECRET, {expiresIn:"7d"})

 
    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

        return res.status(200).json({
      success: true,
      message: "Signin successful",
      user: { id: user._id, username: user.username, email: user.email },
    
    });

}catch(error){
    console.error("Signin error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
}

}
export async function UserLogout(req: Request, res: Response) {
    res.send("logout endpoint ")
}
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

export async function UserLogout(req: Request, res: Response) {
    res.send("logout endpoint ")
}
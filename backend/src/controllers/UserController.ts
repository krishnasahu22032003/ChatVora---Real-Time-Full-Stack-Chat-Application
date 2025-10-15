import express from "express"
import type { Request,Response } from "express"

export async function UserSignUp(req:Request,res:Response){
    res.send("signup endpoint ")
}
export async function UserLogIn(req:Request,res:Response){
    res.send("login endpoint ")
}
export async function UserLogout(req:Request,res:Response){
    res.send("logout endpoint ")
}
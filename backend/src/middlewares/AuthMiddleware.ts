import jwt from "jsonwebtoken";
import { ENV } from "../lib/ENV.js";
import { UserModel } from "../models/UserModel.js";
import type { Request, Response, NextFunction } from "express";



interface JwtPayload {
  _id: string; 
}

export const AuthRoute = async (req: Request, res: Response, next: NextFunction) => {
  try {
   
    const token = req.cookies?.auth_token;
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: No token provided",
      });
    }

   
    const decoded = jwt.verify(token, ENV.JWT_USER_SECRET as string) as JwtPayload;
    if (!decoded || !decoded._id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: Invalid token",
      });
    }

    const user = await UserModel.findById(decoded._id).select("-password");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    req.user = user;


    next();
  } catch (e) {
    console.error("Error in auth middleware:", (e as Error).message);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

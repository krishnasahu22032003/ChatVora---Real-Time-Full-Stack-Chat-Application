import type { Request, Response } from "express"
import bcrypt from "bcrypt"
import z from "zod"
import { UserModel } from "../models/UserModel.js"
import jwt from "jsonwebtoken"
import JWT_SECRET from "../config/config.js"
import { sendWelcomeEmail } from "../email/emailHandlers.js"
import { ENV } from "../lib/ENV.js"
import cloudinary from "../lib/cloudinary.js"


const clientURL = ENV.CLIENT_URL ?? "http://localhost:5173";


export const UserSignUp = async (req: Request, res: Response) => {

  const requiredbody = z.object({
    username: z.string().min(3).max(50).transform((v) => v.trim()),
    email: z.string().email().min(5).max(50).transform((v) => v.trim()),
    password: z.string()
      .min(8).max(128)
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/,
        "Password must include uppercase, lowercase, number, and special character"
      )
      .transform((v) => v.trim()),
  });


  const parseddata = requiredbody.safeParse(req.body)

  if (!parseddata.success) {
    return res.status(400).json({
      message: "validation failed",
      success: false,
      errors: parseddata.error.format()
    })
  }
  const { username, email, password } = parseddata.data

  if (await UserModel.findOne({ email })) {
    return res.status(409).json({
      success: false,
      message: "Invalid Credentials"
    })
  }

  const hashedpassword = await bcrypt.hash(password, 10)

  try {
    const newUser = await UserModel.create({ username, email, password: hashedpassword })
    try {
      await sendWelcomeEmail(newUser.email, newUser.username, clientURL)

    } catch (error) {
      console.error("failed to send welcome email", error)
    }

    return res.status(201).json({
      success: true,
      message: "user created successfully", user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      },

    })
  } catch (e) {
    console.log("singup error", (e as Error).message)
    return res.status(500).json({
      success: false,
      message: "signup failed"
    })
  }

}
export async function UserLogIn(req: Request, res: Response) {

  const requiredbody = z.object({
    email: z.string().email().min(5).max(50).transform((v) => v.trim()),
    password: z.string()
      .min(8).max(128)
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/,
        "Password must include uppercase, lowercase, number, and special character"
      )
      .transform((v) => v.trim()),
  });

  const parseddata = requiredbody.safeParse(req.body)

  if (!parseddata.success) {
    return res.status(400).json({
      success: false,
      message: "email and password are required",
      errors: parseddata.error.format(),
    })
  }
  const { email, password } = parseddata.data
  try {
    const user = await UserModel.findOne({ email })
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "user does not exists , please signup first"
      })
    }

    const ok = await bcrypt.compare(password, user.password)
    if (!ok) {
      return res.status(401).json({
        success: false,
        message: "Invalid Credentials"
      })
    }
    const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: "7d" })


    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: ENV.NODE_ENV === "production" ? false : true,
      sameSite: ENV.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: "Signin successful",
      user: { id: user._id, username: user.username, email: user.email },

    });

  } catch (error) {
    console.error("Signin error:", (error as Error).message);
    return res.status(500).json({ success: false, message: "Server error" });
  }

}
export async function UserLogout(req: Request, res: Response) {

  try {
    res.clearCookie("auth_token", {
      httpOnly: true,
      secure: ENV.NODE_ENV === "production",
      sameSite: ENV.NODE_ENV === "production" ? "none" : "lax",
    });
    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.log("logout failed", (error as Error).message);
    return res.status(500).json({ success: false, message: "Server error" });
  }

}


export async function UpdateProfile(req: Request, res: Response) {

  try {
    const { ProfilePic } = req.body;
    if (!ProfilePic) {
      return res.status(400).json({
        success: false,
        message: "ProfilePic is required"
      })
    }
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized – user not found in request",
      });
    }

    const userId = req.user._id
    const UploadResponse = await cloudinary.uploader.upload(ProfilePic)
    const updatedUser = await UserModel.findByIdAndUpdate(userId, { ProfilePic: UploadResponse.secure_url }, { new: true }).select("-password")
    res.status(200).json(updatedUser)
  } catch (error) {
    console.log("error in update profile", (error as Error).message)
    res.status(500).json({
      success: false,
      message: "Internal server error"
    })

  }
}
export const CheckUser = async (req:Request,res:Response)=>{

   try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const user = await UserModel.findById(req.user._id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error in /check route:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
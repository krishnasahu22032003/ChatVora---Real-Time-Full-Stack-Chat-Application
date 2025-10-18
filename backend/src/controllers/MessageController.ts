// controllers/contactController.ts
import type { Request, Response } from "express";
import { UserModel } from "../models/UserModel.js";

// define the expected request body shape
interface GetAllContactsBody {
  _id: string;
}

export const getAllContacts = async (
  req: Request<{}, {}, GetAllContactsBody>,
  res: Response
) => {
  try {
    // runtime guard: req.body could be undefined at runtime if middleware missing

    const loggedInUserId = req.user?._id;

    // find all users except the logged-in user, exclude password
    const filteredUsers = await UserModel.find({ _id: { $ne: loggedInUserId } }).select("-password");

    return res.status(200).json({ success: true, users: filteredUsers });
  } catch (error) {
    console.error("Error in getAllContacts:", (error as Error).message);
    return res.status(500).json({ success: false, message: "server error" });
  }
};

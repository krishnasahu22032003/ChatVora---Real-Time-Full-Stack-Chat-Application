// controllers/contactController.ts
import type { Request, Response } from "express";
import { UserModel } from "../models/UserModel.js";
import mongoose from "mongoose";
import z from "zod";
import UserMessage from "../models/Message.js";
import cloudinary from "../lib/cloudinary.js";

// define the expected request body shape
interface GetAllContactsBody {
  _id: string;
}

const idSchema = z.string().refine(
  (val) => mongoose.Types.ObjectId.isValid(val),
  { message: "Invalid user id format " }
)

export const getAllContacts = async (
  req: Request<{}, {}, GetAllContactsBody>,
  res: Response
) => {
  try {

    const loggedInUserId = req.user?._id;
    const filteredUsers = await UserModel.find({ _id: { $ne: loggedInUserId } }).select("-password");

    return res.status(200).json({ success: true, users: filteredUsers });
  } catch (error) {
    console.error("Error in getAllContacts:", (error as Error).message);
    return res.status(500).json({ success: false, message: "server error" });
  }
};

export const getMessagesByUserId = async (req: Request, res: Response) => {

  try {

    const myId = req.user._id

    const { id: userToChatid } = req.params

    const parsed = idSchema.safeParse(userToChatid)

    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        message: parsed.error?.issues?.[0]?.message || "Invalid user id",
      });
    }

    const ValidId = parsed.data

    const Messages = await UserMessage.find({
      $or: [{ senderId: myId, receiverId: ValidId },
      { senderId: ValidId, receiverId: myId }
      ]
    })
    res.status(200).json(Messages)

  } catch (error) {
    console.log("Error while Fetching messages", (error as Error).message)
    res.status(500).json({ success: false, message: "Internal Server Error" })
  }
}

export const SendMessages = async (req: Request, res: Response) => {

  try {

    const { text, image } = req.body
    const { id: receiverId } = req.params
    const senderId = req.user._id

if(!text&&!image){
return res.status(400).json({success:false,message:"text or image is required"})
}

if(senderId.equals(receiverId)){
  return res.status(400).json({success:false,message:"cant send message to yourself"})
}

const receiverExists =  await UserModel.exists({_id:receiverId})
if(!receiverExists){
  return res.status(400).json({success:false,message:"receiver not found"})
}

    let imageUrl;

    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image)
      imageUrl = uploadResponse.secure_url

    }

    const newMessage = new UserMessage({

      senderId,
      receiverId,
      text,
      image: imageUrl

    })
    await newMessage.save()

    res.status(200).json(newMessage)
  } catch (error) {
    console.log("Error in sending Messages", (error as Error).message)
    res.status(500).json({ success: false, message: "Internal Server Error" })

  }

}


export const getChatPartner = async (req: Request, res: Response) => {

  try {
    const loggedInUserId = req.user._id

    const messages = await UserMessage.find({

      $or: [{ senderId: loggedInUserId }, { receiverId: loggedInUserId }]

    })

    const ChatPartnersId = [...new Set(messages.map((msg) => msg.senderId.toString() === loggedInUserId.toString() ? msg.receiverId.toString() : msg.senderId.toString()))]
    const chatPartners = await UserModel.find({_id:{$in:ChatPartnersId}}).select("-password")
res.status(200).json(chatPartners)

  } catch (error) {

  }

}
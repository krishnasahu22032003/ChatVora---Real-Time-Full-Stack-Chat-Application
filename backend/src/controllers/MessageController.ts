// controllers/contactController.ts
import type { Request, Response } from "express";
import { UserModel } from "../models/UserModel.js";
import mongoose from "mongoose";
import z  from "zod";
import UserMessage from "../models/Message.js";

// define the expected request body shape
interface GetAllContactsBody {
  _id: string;
}

const idSchema = z.string().refine(
  (val) => mongoose.Types.ObjectId.isValid(val),
{message:"Invalid user id format "}
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

export const getMessagesByUserId = async (req:Request,res:Response)=>{

try{

const myId =  req.user._id

const {id:userToChatid} = req.params

const parsed  =  idSchema.safeParse(userToChatid)

   if (!parsed.success) {
      return res.status(400).json({
        success: false,
       message: parsed.error?.issues?.[0]?.message || "Invalid user id",
      });
    }

const ValidId = parsed.data

const Messages = await UserMessage.find({
  $or:[{senderId:myId , receiverId: ValidId},
    {senderId:ValidId , receiverId:myId}
  ]
})
res.status(200).json(Messages)

}catch(error){
console.log("Error while Fetching messages",(error as Error).message)
res.status(500).json({success:false,message:"Internal Server Error"})
}


}

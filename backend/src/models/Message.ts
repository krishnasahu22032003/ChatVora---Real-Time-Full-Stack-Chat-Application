import mongoose, { Types } from "mongoose";


interface MessagesTypes {

senderId:Types.ObjectId
receiverId:Types.ObjectId
text:string,
image:string


}

const UserMessageSchema = new mongoose.Schema<MessagesTypes>({

senderId:{type:mongoose.Schema.Types.ObjectId,ref:"user",required:true},
receiverId:{type:mongoose.Schema.Types.ObjectId,ref:"user",required:true},
text:{type:String},
image:{type:String,trim:true,maxlength:2000 },

},{timestamps:true})

 const UserMessage = mongoose.model("UserMessage",UserMessageSchema) 

 export default UserMessage
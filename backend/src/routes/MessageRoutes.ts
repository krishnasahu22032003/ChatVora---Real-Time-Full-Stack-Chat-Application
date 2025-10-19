import express from "express"
import { getAllContacts } from "../controllers/MessageController.js"
import { AuthRoute } from "../middlewares/AuthMiddleware.js"
import { getMessagesByUserId } from "../controllers/MessageController.js"
import { SendMessages } from "../controllers/MessageController.js"
const messageRouter = express.Router()

messageRouter.get("/contacts",AuthRoute,getAllContacts)
// messageRouter.get("/chats",getChatPartner)
messageRouter.get("/:id",AuthRoute,getMessagesByUserId)
messageRouter.post("/send/:id",AuthRoute,SendMessages)


export default messageRouter
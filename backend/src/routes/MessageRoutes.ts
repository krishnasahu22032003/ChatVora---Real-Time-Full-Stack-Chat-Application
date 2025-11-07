import express from "express"
import { getAllContacts } from "../controllers/MessageController.js"
import { AuthRoute } from "../middlewares/AuthMiddleware.js"
import { getMessagesByUserId } from "../controllers/MessageController.js"
import { SendMessages } from "../controllers/MessageController.js"
import { getChatPartner } from "../controllers/MessageController.js"
import { ArcjetProtection } from "../middlewares/ArcjetMiddleware.js"



const messageRouter = express.Router()

messageRouter.use(ArcjetProtection)
messageRouter.use(AuthRoute)
messageRouter.get("/contacts",getAllContacts)
messageRouter.get("/chats",getChatPartner)
messageRouter.get("/:id",getMessagesByUserId)
messageRouter.post("/send/:id",SendMessages)


export default messageRouter
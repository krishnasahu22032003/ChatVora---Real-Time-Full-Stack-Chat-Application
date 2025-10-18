import express from "express"
import { getAllContacts } from "../controllers/MessageController.js"
import { AuthRoute } from "../middlewares/AuthMiddleware.js"


const messageRouter = express.Router()

messageRouter.get("/contacts",AuthRoute,getAllContacts)
// messageRouter.get("/chats",getChatPartner)
// messageRouter.get("/:id",getMessagesByUserId)
// messageRouter.post("/send:id",SendMessages)


export default messageRouter
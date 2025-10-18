import express from "express"
import { SendMessage } from "../controllers/MessageController.js"
const messageRouter = express.Router()

app.post("/send",SendMessage)


export default messageRouter
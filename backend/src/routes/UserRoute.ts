import express from "express"
import { UserSignUp, UserLogIn, UserLogout } from "../controllers/UserController.js"

const UserRouter = express.Router()

UserRouter.post("/signup", UserSignUp)
UserRouter.post("/signin", UserLogIn)
UserRouter.post("/logout", UserLogout)

export default UserRouter
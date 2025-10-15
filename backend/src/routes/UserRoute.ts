import express from "express"
import { UserSignUp, UserLogIn, UserLogout } from "../controllers/UserController.js"

const UserRouter = express.Router()

UserRouter.get("/signup", UserSignUp)
UserRouter.get("/signin", UserLogIn)
UserRouter.get("/logout", UserLogout)

export default UserRouter
import express from "express"
import { UserSignUp, UserLogIn, UserLogout ,UpdateProfile } from "../controllers/UserController.js"
import { AuthRoute } from "../middlewares/AuthMiddleware.js"
const UserRouter = express.Router()

UserRouter.post("/signup", UserSignUp)
UserRouter.post("/signin", UserLogIn)
UserRouter.post("/logout", UserLogout)
UserRouter.put("/UpdateProfile",AuthRoute,UpdateProfile)

export default UserRouter
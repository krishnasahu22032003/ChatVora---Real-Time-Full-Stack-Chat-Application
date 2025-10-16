import express from "express"
import { UserSignUp, UserLogIn, UserLogout ,UpdateProfile } from "../controllers/UserController.js"
import { AuthRoute } from "../middlewares/AuthMiddleware.js"
import { ArcjetProtection } from "../middlewares/ArcjetMiddleware.js"

const UserRouter = express.Router()

UserRouter.use(ArcjetProtection)

UserRouter.post("/signup", UserSignUp)
UserRouter.post("/signin", ArcjetProtection,UserLogIn)
UserRouter.post("/logout", UserLogout)
UserRouter.put("/UpdateProfile",AuthRoute,UpdateProfile)
UserRouter.get("/check",AuthRoute,(req,res)=>{res.status(200).json(req.user)})

export default UserRouter
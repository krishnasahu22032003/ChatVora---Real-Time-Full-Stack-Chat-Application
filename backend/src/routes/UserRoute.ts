import express from "express"
import { UserSignUp, UserLogIn, UserLogout ,UpdateProfile , CheckUser} from "../controllers/UserController.js"
import { AuthRoute } from "../middlewares/AuthMiddleware.js"
// import { ArcjetProtection } from "../middlewares/ArcjetMiddleware.js"

const UserRouter = express.Router()

// UserRouter.use(ArcjetProtection)

UserRouter.post("/signup", UserSignUp)
UserRouter.post("/signin", UserLogIn)
UserRouter.post("/logout", UserLogout)
UserRouter.put("/UpdateProfile",AuthRoute,UpdateProfile)
UserRouter.get("/check",AuthRoute,CheckUser)

export default UserRouter
import express from "express"
import UserRouter from "./routes/UserRoute.js"
import { connectDB } from "./lib/db.js"
import { ENV } from "./lib/ENV.js"
import cookieParser from "cookie-parser"
import messageRouter from "./routes/MessageRoutes.js"
import cors from "cors"



const app = express()

const PORT = ENV.PORT || 5000
 
app.use(express.json({limit:"15mb"}))

app.use(cookieParser())

app.use(cors({origin:ENV.CLIENT_URL,credentials:true}))



app.use('/api/user', UserRouter)
app.use('/api/messages', messageRouter)


app.listen(PORT, () => {
    console.log(`app running on ${PORT}`)
    connectDB()
})
import express from "express"
import dotenv from "dotenv"
import UserRouter from "./routes/UserRoute.js"
import { connectDB } from "./lib/db.js"

dotenv.config()

const app = express()

const PORT = process.env.PORT || 5000
 
app.use(express.json())

app.use('/api/user', UserRouter)


app.listen(PORT, () => {
    console.log(`app running on ${PORT}`)
    connectDB()
})
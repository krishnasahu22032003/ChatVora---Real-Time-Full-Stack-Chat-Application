import express from "express"
import dotenv from "dotenv"
import UserRouter from "./routes/UserRoute.js"

dotenv.config()

const app = express()

const PORT = process.env.PORT || 5000


app.use('/api/user', UserRouter)


app.listen(PORT, () => {
    console.log(`app running on ${PORT}`)
})
import express from "express"
import UserRouter from "./routes/UserRoute.js"
import { connectDB } from "./lib/db.js"
import { ENV } from "./lib/ENV.js"


const app = express()

const PORT = ENV.PORT || 5000
 
app.use(express.json())

app.use('/api/user', UserRouter)


app.listen(PORT, () => {
    console.log(`app running on ${PORT}`)
    connectDB()
})
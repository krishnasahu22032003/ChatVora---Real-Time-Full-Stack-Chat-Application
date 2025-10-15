import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config()

export const connectDB = () => {
    mongoose.connect(process.env.MONGO_URL as string)
        .then(() => {
            console.log("connected to database")
        })
        .catch((err) => {
            console.log(err, "Error while connecting to the database")
            process.exit(1)
        })
}


import mongoose from "mongoose";
import { ENV } from "./ENV.js";


export const connectDB = () => {
    mongoose.connect(ENV.MONGO_URL as string)
        .then(() => {
            console.log("connected to database")
        })
        .catch((err) => {
            console.log(err, "Error while connecting to the database")
            process.exit(1)
        })
}


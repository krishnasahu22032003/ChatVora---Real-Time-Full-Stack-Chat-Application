import { Resend } from "resend";
import dotenv from "dotenv"

dotenv.config()

export const ResendClient  = new Resend(process.env.RESEND_API_KEY)

export const sender = {
    email:process.env.EMAIL_FROM,
    name:process.env.EMAIL_FROM_NAME
}
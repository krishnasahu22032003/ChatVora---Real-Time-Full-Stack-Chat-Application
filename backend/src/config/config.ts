import dotenv from "dotenv"

dotenv.config()

const JWT_SECRET = process.env.JWT_USER_SECRET || "dev-secret"

export default JWT_SECRET


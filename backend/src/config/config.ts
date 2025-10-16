import { ENV } from "../lib/ENV.js"
const JWT_SECRET = ENV.JWT_USER_SECRET || "dev-secret"

export default JWT_SECRET


import { v2 as cloudinary } from "cloudinary";
import { ENV } from "./ENV.js";

cloudinary.config({
    cloud_name:ENV.CLOUDINARY_CLOUD_NAME as string,
    api_key:ENV.CLOUDINARY_API_KEY as string,
    api_secret:ENV.CLOUDINARY_API_SECRET as string
})

export default cloudinary
import {UserType} from "../models/UserModel"
import { Types } from "mongoose";
declare global {
    namespace Express{
        interface Request{
               user?: UserType & { _id: Types.ObjectId }; 
        }
    }
}
//extend types for user 
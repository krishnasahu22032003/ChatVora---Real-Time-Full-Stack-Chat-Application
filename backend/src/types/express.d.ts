import {UserType} from "../models/UserModel.ts"
import { Types } from "mongoose";
declare global {
    namespace Express{
        interface Request{
               user?: UserType & { _id: Types.ObjectId }; 
        }
    }
}
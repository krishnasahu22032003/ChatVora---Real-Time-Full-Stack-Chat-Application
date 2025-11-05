import "socket.io";
import type { Document,Types } from "mongoose";

declare module "socket.io" {
  interface Socket {
    user?: Document & {
      _id: Types.ObjectId;
      name?: string;
      email?: string;
    };
    userId?: string;
  }
}

import { Server } from "socket.io";
import http from "http"
import express from "express";
import { ENV } from "./ENV.js";
import { socketauthmiddleware } from "../middlewares/socketauthmiddleware.js";


const app = express()

const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: ENV.CLIENT_URL,
        credentials: true
    }
})


io.use(socketauthmiddleware)

export function getReceiverSocketId(userId:string) {
  return userSocketMap[userId];
}



const userSocketMap: Record<string, string> = {}

   io.on("connection", (socket) => {

       console.log("A User connected", socket.user?.username)

          const userId = socket.userId

            if (!userId) {

               console.warn("⚠️ socket.userId is undefined, skipping map registration");

              return;
                      }

    userSocketMap[userId] = socket.id



    io.emit("GetOnlineUsers",Object.keys(userSocketMap))

    socket.on("disconnect",()=>{

          console.log("A User Disconnected", socket.user?.username)

         delete userSocketMap[userId]

            io.emit("GetOnlineUsers",Object.keys(userSocketMap))

    })
})

export {io,server,app}

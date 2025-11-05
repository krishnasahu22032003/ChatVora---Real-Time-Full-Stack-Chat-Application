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
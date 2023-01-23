const express = require("express");
const http = require("http");
import * as BodyParser from "body-parser";
import cors from "cors";
const app = express();
const {Server} = require('socket.io');

//routers list
const studentRouter = require("./src/routes/studentRouter");


app.use(cors());
app.use(BodyParser.json());
app.use("/api/student", studentRouter);

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST", "PUT", "DELETE"]
    }
});

global.io = io;

io.on('connection', (socket) => {
    console.log(`a user connected: ${socket.id}`);
});


module.exports = server
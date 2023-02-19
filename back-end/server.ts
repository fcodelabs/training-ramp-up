const express = require("express");
const http = require("http");
import * as BodyParser from "body-parser";
import cors from "cors";
const verifyJWT = require("./src/middlewares/verifyJWT");
const app = express();
const cookieParser = require("cookie-parser");
const { Server } = require("socket.io");

//routers list
const studentRouter = require("./src/routes/studentRouter");
const userRouter = require("./src/routes/userRouter");

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/user", userRouter);

// app.use(verifyJWT);
app.use("/api/student", studentRouter);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

global.io = io;

io.on("connection", (socket) => {
  console.log(`a user connected: ${socket.id}`);
});

module.exports = server;

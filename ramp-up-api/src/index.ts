import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import http from "http";
import "reflect-metadata";
import { Server } from "socket.io";
import { AppDataSource } from "./data-source";

import studentRoutes from "./routes/students";
import userRoutes from "./routes/users";

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((error) => console.log(error));

const app = express();
const PORT = 5000;

app.use(cors());

app.use(bodyParser.json());

app.use("/students", studentRoutes);

app.use("/users", userRoutes);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User is connected: ${socket.id}`);

  socket.on("student_added", (data) => {
    socket.broadcast.emit("student_received", data);
  });
  socket.on("student_edit", (data) => {
    socket.broadcast.emit("student_updated", data);
  });
  socket.on("student_remove", (data) => {
    socket.broadcast.emit("student_deleted", data);
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port: http://localhost:${PORT}`);
});

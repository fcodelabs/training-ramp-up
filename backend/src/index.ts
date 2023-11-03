import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";

import { studentRouter } from "./students/student.router";
import { createServer } from "http";
import { Server } from "socket.io";

dotenv.config();

if (!process.env.PORT) {
  process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (soket) => {
  console.log("client is connected");
});

app.use(cors());
app.use(express.json());
app.use("/api/students", studentRouter);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

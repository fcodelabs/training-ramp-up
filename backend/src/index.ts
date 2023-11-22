import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";

import { studentRouter } from "./routes/student.routes";
import { userRouter } from "./routes/user.routes";
import { authRouter } from "./routes/auth.routes";
import { myDataSource } from "./utils/app-data-source";

dotenv.config();

if (!process.env.PORT) {
  process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

myDataSource
  .initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });

export const app = express();

const server = http.createServer(app);
export const io = new Server(server, {
  cors: { origin: "http://localhost:3000" },
});

io.on(
  "connection",
  (socket: { on: (arg0: string, arg1: () => void) => void }) => {
    console.log("a user connected");
    socket.on("disconnect", () => {
      console.log("user disconnected");
    });
  }
);

app.use(
  cors({
    credentials: true,
    origin: true,
  })
);
app.options("*", cors());
app.use(express.json());
app.use("/api/students", studentRouter);
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

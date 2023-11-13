import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";

import { studentRouter } from "./routes/student.routes";
import { createServer } from "http";
import { Server } from "socket.io";
import { userRouter } from "./routes/user.routes";
import { authRouter } from "./routes/auth.routes";

dotenv.config();

if (!process.env.PORT) {
  process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

io.on("connection", (soket) => {
  console.log("client is connected");
});

app.use(cors());
app.use(express.json());
app.use("/api/students", studentRouter);
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

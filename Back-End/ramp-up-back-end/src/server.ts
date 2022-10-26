import express from "express";
import { Request, Response, NextFunction } from "express";

import { AppDataSource } from "./dataSource";
import { ErrorInterface } from "./interfaces/servertypes";
import studentRoutes from "./routes/studentRoutes";
import userRoutes from "./routes/userRoutes";
import bodyParser from "body-parser";
import cors from "cors";

import { createServer } from "http";
import { Server } from "socket.io";

import cookieParser from "cookie-parser";

const app = express();
const httpServer = createServer(app);

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });

app.use(express.json());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(cookieParser());

app.use(cors());

app.use("/student", studentRoutes);
app.use("/user", userRoutes);

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000/",
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

io.on("connection", (socket) => {
  console.log(`connect ${socket.id}`);

  socket.on("student_add", (data) => {
    socket.broadcast.emit("student_added", data);
  });

  socket.on("student_update", (data) => {
    socket.broadcast.emit("student_updated", data);
  });

  socket.on("student_delete", (data) => {
    socket.broadcast.emit("student_deleted", data);
  });
});

app.use((req: Request, res: Response, next: NextFunction) => {
  const err: ErrorInterface = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.use((err: ErrorInterface, req: Request, res: Response) => {
  res.status(err.status || 500);
  res.json({
    err: {
      message: err.message,
    },
  });
});

httpServer.listen(8000, () => {
  console.log("Application started on port 8000!");
});

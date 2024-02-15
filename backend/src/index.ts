// src/index.js
import "reflect-metadata";
import express, { Express, Request, Response } from "express";
import { DataSource } from "typeorm";

import socketRouter from "./routes/studentRoute";
import userRouter from "./routes/userRoute";
import authRouter from "./routes/authRoute";

import dotenv from "dotenv";
import { Student } from "./models/student";
import { Server } from "socket.io";
import http from "http";
import cors from "cors";
import { User } from "./models/user";
import cookieParser from "cookie-parser";
import socketAuthRouter from "./routes/authRoute";
import sockeUsertRouter from "./routes/userRoute";
// import crypto from "crypto";

dotenv.config();

const app: express.Application = express();
// app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(
  cors({
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    origin: [
      "http://localhost:3000",
      "https://training-ramp-up.web.app/login",
      "https://frontend.ramp-up-epcm.me",
    ],
  }),
);
const port = process.env.PORT || 8000;
const server = http.createServer(app);

// const io = new Server(server);

const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:3000",
      "https://training-ramp-up.web.app",
      "https://frontend.ramp-up-epcm.me",
    ],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);
});

export const AppDataSource = new DataSource({
  type: "postgres",
  //host: process.env.LOCALHOST,
  port: 5432,
  //username: process.env.DB_USERNAME,
  //password: process.env.PASSWORD,
  //database: process.env.DATABASE,
  //synchronize: true,

  url: process.env.DEPLOYED_URL,
  logging: true,
  entities: [Student, User],
  ssl: {
    rejectUnauthorized: false,
  },
  migrations: [],
  subscribers: [],
});

console.log("process.env.DEPLOYED_URL", process.env.DEPLOYED_URL);
AppDataSource.initialize()
  .then(() => {
    console.log("Database connected");
    // app.listen(port, () => {
    //   console.log(`Server running on port ${port}`);
    // });
    // server.listen(5000, () => {
    //   console.log(`server is running on port ${port}`);
    // });
  })
  .catch((err) => {
    console.log("Error while connecting to the database", err);
  });

app.use(express.json());
app.use(cookieParser());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.use("/auth", socketAuthRouter(io));

app.use("/user", sockeUsertRouter(io));
app.use("/student", socketRouter(io));

server.listen(5000, () => {
  console.log(`server is running on port ${port}`);
});

// app.use((err: any, req: Request, res: Response) => {
//   const errorStatus = err.status || 500;
//   const errorMessage = err.message || "something went wrong!";
//   return res.status(errorStatus).json({
//       success: false,
//       status: errorStatus,
//       message: errorMessage,
//       stack: err.stack,
//   });
// });

// src/index.js
import "reflect-metadata";
import express, { Express, Request, Response } from "express";
import { DataSource } from "typeorm";

import socketRouter from "./routes/studentRoute";
import socketAuthRouter from "./routes/authRoute";
import sockeUsertRouter from "./routes/userRoute";

import dotenv from "dotenv";
import { Student } from "./models/student";
import { Server } from "socket.io";
import http from "http";
import cors from "cors";
import { User } from "./models/user";
import cookieParser from "cookie-parser";

dotenv.config();

const app: express.Application = express();

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

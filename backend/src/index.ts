// src/index.js
import express, { Express, Request, Response } from "express";
import { DataSource } from "typeorm";

import studentRoute from "./routes/studentRoute";
import socketRouter from "./routes/studentRoute";

import dotenv from "dotenv";
import { Student } from "./models/Student";

const { createServer } = require("node:http");
const { Server } = require("socket.io");
const cors = require("cors");

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8000;
const server = createServer(app);

const io = new Server(server);

app.use(cors());

io.on("connection", (socket: any) => {
  console.log("a user connected");
});

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.LOCALHOST,
  port: 5432,
  username: process.env.DB_USERNAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  synchronize: true,
  logging: true,
  entities: [Student],
});

AppDataSource.initialize()
  .then(() => {
    console.log("Database connected");
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((err) => {
    console.log("Error while connecting to the database", err);
  });

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

// app.use("/student", studentRoute);
app.use("/student", socketRouter(io));

// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });

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

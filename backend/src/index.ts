import express, { Express } from "express";
import dotenv from "dotenv";
import { DataSource } from "typeorm";
import { studentRoutes } from "./routes/studentRoute";
import { userRoutes } from "./routes/userRoute";
import cors from "cors";
import { createServer } from "node:http";
import { Server } from "socket.io";
import cookieParser from "cookie-parser";
import bodyParser = require("body-parser");
import { authRoutes } from "./routes/authRouter";

dotenv.config();

interface IUserBasicInfo {
  email: string;
  role: string;
}
/* eslint-disable @typescript-eslint/no-namespace */
declare global {
  namespace Express {
    interface Request {
      user?: IUserBasicInfo | null;
    }
  }
}
/* eslint-enable @typescript-eslint/no-namespace */

const app: Express = express();
export const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: [process.env.CLIENT_URL, "https://ramp-up-812d5.web.app"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  },
});
app.use(bodyParser.json()); // To recognize the req obj as a json obj
app.use(bodyParser.urlencoded({ extended: true }));

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

const port = process.env.PORT || 5000;

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);

app.use(cookieParser());

export const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.URL,
  entities: ["src/models/**/*.ts"],
  synchronize: true,
  logging: false,
  ssl: {
    rejectUnauthorized: false,
  },
  migrations: [],
  subscribers: [],
});
const startServer = async () => {
  try {
    await AppDataSource.initialize();
    console.log("Data Source has been initialized!");

    studentRoutes(app, io);
    userRoutes(app, io);
    authRoutes(app);

    server.listen(port, () => {
      console.log(`[server]: Server is running at http://localhost:${port}`);
    });
  } catch (err) {
    console.error("Error during Data Source initialization", err);
  }
};

startServer();

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
    origin: "http://localhost:3000",
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
    origin: "http://localhost:3000",
    credentials: true,
  }),
);

app.use(cookieParser());

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "27090",
  database: "Ramp-up",
  entities: ["src/models/**/*.ts"],
  synchronize: false,
  logging: false,
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

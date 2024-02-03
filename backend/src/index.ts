import express, { Express } from "express";
import dotenv from "dotenv";
import { DataSource } from "typeorm";
import { studentRoutes } from "./routes/studentRoute";
import { userRoutes } from "./routes/userRoute";
import cors from "cors";
import { createServer } from "node:http";
import { Server } from "socket.io";

dotenv.config();

const app: Express = express();
app.use(express.json());
export const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

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
  }),
);

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "27090",
  database: "Ramp-up",
  entities: ["src/models/**/*.ts"],
  synchronize: true,
  logging: false,
});
const startServer = async () => {
  try {
    await AppDataSource.initialize();
    console.log("Data Source has been initialized!");

    studentRoutes(app, io);
    userRoutes(app);

    server.listen(port, () => {
      console.log(`[server]: Server is running at http://localhost:${port}`);
    });
  } catch (err) {
    console.error("Error during Data Source initialization", err);
  }
};

startServer();

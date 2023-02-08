import { verifyJWT } from './src/middleware/verifyJWT';
import express from "express";
import "reflect-metadata";
import { AppDataSource } from "./src/configs/DataSourceConfig";
import cors from "cors";
import userRoutes from "./src/routes/userRoutes";
import studentRoutes from "./src/routes/studentRoutes";
import authRoutes from "./src/routes/authRoutes";
import passport from "passport";
import cookieparser from "cookie-parser";
import dotenv from "dotenv";
import { app, httpServer, io } from "./app";
import { NextFunction, Request, Response } from "express";
import { BackendError } from "./src/utils/backendErr";
//import cookieSession from "cookie-session";
import session from "express-session";

import "./src/middleware/passport";

const PORT = process.env.PORT || 5000;

dotenv.config();

app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "secretcode",
    cookie: { maxAge: 60000 },
    saveUninitialized: false,
    resave: false,
  })
);
// app.use(
//   cookieSession({
//     name: "session",
//     keys: ["key1"],
//     maxAge: 24 * 60 * 60 * 1000, // 24 hours
//   })
// );
app.use(cookieparser());
app.use(passport.initialize());
app.use(passport.session());

//socket
io.on("connection", (socket: any) => {
  console.log("a user connected");
  app.set("socket", socket);
  socket.on("disconnect", () => {
    console.log("someone disconnected");
  });
});

//routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/students", studentRoutes);


/* Error handler middleware */
app.use(
  (err: BackendError, req: Request, res: Response, next: NextFunction) => {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({ message: err.message });
    return;
  }
);

AppDataSource.initialize()
  .then(() => {
    console.log("success connected to the database!");
    httpServer.listen(PORT, () => {
      console.log("server running on port 5000!");
    });
  })
  .catch((err) => {
    console.log(err);
  });

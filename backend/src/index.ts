// src/index.js
import express, { Express, Request, Response } from "express";
import { createConnection } from "typeorm";

import dotenv from "dotenv";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8000;

const startServer = async () => {
  try {
    await createConnection({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "epcm",
      database: "ramp-up",
      synchronize: true,
      entities: ["src/models/**/*.ts"],
    });
    console.log("Database connected!");
  } catch (error) {
    throw new Error("Error while connecting to the database");
    console.log(error);
   
  }

  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
}

startServer();
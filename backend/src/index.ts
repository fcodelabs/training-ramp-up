// src/index.js
import express, { Express, Request, Response } from "express";
import { DataSource } from "typeorm";

import dotenv from "dotenv";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8000;

const AppDataSource = new DataSource({
  type:"postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "epcm",
  database: "ramp-up",
  synchronize: true,
  entities: ["src/entity/**/*.ts"],
  
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
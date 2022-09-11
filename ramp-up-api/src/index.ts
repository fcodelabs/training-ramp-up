import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import "reflect-metadata";
import { AppDataSource } from "./data-source";

import studentRoutes from "./routes/students";

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((error) => console.log(error));

const app = express();
const PORT = 5000;

app.use(cors());

app.use(bodyParser.json());

app.use("/students", studentRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port: http://localhost:${PORT}`);
});

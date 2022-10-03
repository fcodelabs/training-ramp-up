import express from "express";
import { Request, Response } from "express";
import { AppDataSource } from "./dataSource";

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });

const app = express();

app.get("/", (req: Request, res: Response) => {
  res.send("Ramp Up");
});

app.listen(8000, () => {
  console.log("Application started on port 8000!");
});

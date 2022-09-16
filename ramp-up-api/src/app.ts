require("dotenv").config();
import "reflect-metadata";
import { AppDataSource } from "./utils/data-source";
import express from "express";
import * as BodyParser from "body-parser";
import cors from "cors";
import studentRoute from "./routes/studentRoute";

AppDataSource.initialize()
  .then(async () => {
    const app = express();
    app.use(express.json());
    app.use(studentRoute);
    app.use(cors());
    app.use(BodyParser.json());
    app.listen(8080, () => console.log("App is running at port 8080."));

    // const user = new User()
    // user.firstName = "Timber"
    // user.lastName = "Saw"
    // user.age = 25
    // await AppDataSource.manager.save(user)
    // console.log("Saved a new user with id: " + user.id)

    // console.log("Loading users from the database...")
    // const users = await AppDataSource.manager.find(User)
    // console.log("Loaded users: ", users)

    console.log(
      "Here you can setup and run express / fastify / any other framework."
    );
  })
  .catch((error) => console.log(error));

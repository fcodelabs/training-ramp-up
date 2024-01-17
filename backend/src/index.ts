import * as express from "express";
import * as bodyParser from "body-parser";
import { Request, Response } from "express";
import { AppDataSource } from "./data-source";
import { Routes } from "./routes";
import { Student } from "./entity/Student";

AppDataSource.initialize()
  .then(async () => {
    const app = express();
    app.use(bodyParser.json());

    Routes.forEach((route) => {
      (app as any)[route.method](
        route.route,
        (req: Request, res: Response, next: Function) => {
          const result = new (route.controller as any)()[route.action](
            req,
            res,
            next
          );
          if (result instanceof Promise) {
            result.then((result) =>
              result !== null && result !== undefined
                ? res.send(result)
                : undefined
            );
          } else if (result !== null && result !== undefined) {
            res.json(result);
          }
        }
      );
    });

    app.listen(3000);

    console.log("Express server has started on port 3000. ");

    AppDataSource.getRepository(Student)
      .save({
        name: "John Doe",
        gender: "Male",
        address: "No. 1, Galle Road, Colombo 03",
        mobile: "0716272786",
        birthday: new Date("1990-01-01"),
        age: 30,
      })
      .then((student) => console.log("Student has been saved: ", student))
      .catch((error) => console.log(error))
  })
  .catch((error) => console.log(error));

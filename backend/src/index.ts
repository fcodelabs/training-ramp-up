import * as express from "express";
import * as bodyParser from "body-parser";
import { AppDataSource } from "./config/data-source";
import { Routes } from "./routes/routes";
import cors = require("cors");
import { createServer } from "http";

import { initializeSocketIO } from "../src/services/socketService"; // Import the socket manager

AppDataSource.initialize().then(async () => {
  const app = express();
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(
    cors({
      origin: "*",
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      credentials: true,
    })
  );

  const server = createServer(app);
  initializeSocketIO(server);

  Routes.forEach((route) => {
    (app as any)[route.method](
      route.route,
      (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
      ) => {
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

  server.listen(process.env.PORT);

  console.log(`Express server has started on port ${process.env.PORT}.`);
});

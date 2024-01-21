// import * as express from "express";
// import * as bodyParser from "body-parser";
// import { Request, Response } from "express";
// import { AppDataSource } from "./config/data-source";
// import { Routes } from "./routes/routes";
// import { createServer } from "http";
// import cors = require("cors");
// import { Server, Socket } from "socket.io";

// AppDataSource.initialize().then(async () => {
//   const app = express();
//   app.use(bodyParser.json());
//   app.use(bodyParser.urlencoded({ extended: true }));
//   app.use(
//     cors({
//       origin: "*",
//       methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//       credentials: true,
//     })
//   );

//   Routes.forEach((route) => {
//     (app as any)[route.method](
//       route.route,
//       (req: Request, res: Response, next: Function) => {
//         const result = new (route.controller as any)()[route.action](
//           req,
//           res,
//           next
//         );
//         if (result instanceof Promise) {
//           result.then((result) =>
//             result !== null && result !== undefined
//               ? res.send(result)
//               : undefined
//           );
//         } else if (result !== null && result !== undefined) {
//           res.json(result);
//         }
//       }
//     );
//   });

//   const httpServer = createServer(app);
//   const io = new Server(httpServer, { /* options */ });
//   io.on("connection", (socket: Socket) => {
//     console.log("A user connected");

//     // Handle socket events here

//     // Socket.IO disconnect event
//     socket.on("disconnect", () => {
//       console.log("User disconnected");
//     });
//   });



//   httpServer.listen(5000);
//   console.log("Express server has started on port 5000. ");
// });


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
      (req: express.Request, res: express.Response, next: express.NextFunction) => {
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

  server.listen(5000);

  console.log("Express server has started on port 5000.");
});

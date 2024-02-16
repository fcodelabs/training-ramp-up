import express, { type Request, type Response } from 'express';
import 'reflect-metadata';
import dataSource from './config/dataSource';
import * as bodyParser from 'body-parser';
import { studentRoutes } from './routes/studentRoutes';

dataSource
  .initialize()
  .then(async () => {
    const app = express();
    app.use(bodyParser.json());

    studentRoutes.forEach((route) => {
      (app as any)[route.method](route.route, async (req: Request, res: Response, next: () => void) => {
        const result = new (route.controller as any)()[route.action](req, res, next);
        if (result instanceof Promise) {
          await result.then((result) => (result !== null && result !== undefined ? res.send(result) : undefined));
        } else if (result !== null && result !== undefined) {
          res.json(result);
        }
      });
    });

    app.listen(3000);

    console.log('Express server has started on port 3000. Open http://localhost:3000/students to see results');
  })
  .catch((error) => {
    console.log(error);
  });

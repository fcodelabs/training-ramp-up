import { Server } from 'socket.io';
import express from 'express';
import { Express } from 'express';
import { createServer } from 'http';
import cors = require('cors');
export const app: Express = express();
export const httpServer = createServer(app);

app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:3000',
  })
);
app.use(express.urlencoded({ extended: true }));

export const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  },
});

/* eslint-disable @typescript-eslint/no-unsafe-argument */
import 'reflect-metadata';
import * as bodyParser from 'body-parser';
import { studentRoutes } from './routes/studentRoutes';
import { userRoutes } from './routes/userRoutes';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';
import express from 'express';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'DELETE', 'PUT']
  }
});

io.on('connection', (socket: any) => {
  socket.emit('newSocket', socket.id);
});

app.use(studentRoutes(io), userRoutes(io));

export { app };

const port = process.env.PORT;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

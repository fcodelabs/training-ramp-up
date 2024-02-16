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
import cookieParser from 'cookie-parser';

dotenv.config();
const app = express();
app.use(cookieParser());
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(bodyParser.json());
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL,
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    credentials: true
  }
});
const sockets = new Map<string, string>();
io.on('connection', (socket: any) => {
  socket.emit('newSocket', socket.id);
  socket.on('login', (email: string) => {
    sockets.set(email, socket.id);
  });
  socket.on('logout', (email: string) => {
    sockets.delete(email);
  });
});

app.use(studentRoutes(io, sockets), userRoutes(io, sockets));

export { app };

const port = process.env.PORT;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

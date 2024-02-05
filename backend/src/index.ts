/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/await-thenable */
/* eslint-disable @typescript-eslint/no-misused-promises */
import 'reflect-metadata';
import express from 'express';
import socketRouter from './routes/student.routes';
import userSocketRouter from './routes/users.routes';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';
import cookieParser from 'cookie-parser';

const app: express.Application = express();
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    credentials: true
  }
});

io.on('connection', (socket) => {
  console.log(socket.id);
});
app.use(cookieParser());
app.use(express.json());
app.use('/students', socketRouter(io));
app.use('/users', userSocketRouter(io));
server.listen(5000, () => {
  console.log('server is running on port: 5000');
});

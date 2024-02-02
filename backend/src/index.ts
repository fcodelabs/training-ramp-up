/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/await-thenable */
/* eslint-disable @typescript-eslint/no-misused-promises */
import 'reflect-metadata';
import express from 'express';
import socketRouter from './routes/student.routes';

import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';
import userSocketRouter from './routes/users.routes';

const app: express.Application = express();
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'DELETE', 'PUT']
  }
});

io.on('connection', (socket) => {
  console.log(socket.id);
});

app.use(express.json());
app.use('/students', socketRouter(io));
app.use('/users', userSocketRouter(io));
server.listen(5000, () => {
  console.log('server is running on port: 5000');
});

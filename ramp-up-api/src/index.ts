import { AppDataSource } from './utill/data-source';
import express from 'express';
import studentsRoutes from './routes/studentsRoutes';
import userRoutes from './routes/userRoutes';
import http from 'http';
import 'reflect-metadata';
const app = express();
const cors = require('cors');
const auth = require('./middleware/auth.ts');
require('dotenv').config();
const { Server } = require('socket.io');
const server = http.createServer(app);
app.use(cors());

AppDataSource.initialize()
  .then(async () => {
    console.log('Now its running');
    app.use(express.json());
    app.use(userRoutes);
    app.use(auth, studentsRoutes);

    const io = new Server(server, {
      cors: {
        origin: 'http://localhost:3000',
        method: ['GET', 'POST', 'PUT', 'DELETE'],
      },
    });

    io.on('connection', (socket) => {
      console.log(`User Connect:${socket.id}`);

      socket.on('student_added', (data) => {
        socket.broadcast.emit('student_received', data);
      });
      socket.on('student_remove', (data) => {
        socket.broadcast.emit('student_deleted', data);
      });
    });
    server.listen(process.env.SERVER_PORT, () => {
      console.log('Server running....port 8000');
    });
  })
  .catch((error) => console.log(error));

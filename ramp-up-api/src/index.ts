import { AppDataSource } from './utill/data-source';
import express from 'express';
import studentsRoutes from './routes/studentsRoutes';
import http from 'http';
import 'reflect-metadata';
const app = express();
const cors = require('cors');
//const http = require('http');
const { Server } = require('socket.io');
const server = http.createServer(app);
app.use(cors());
// app.use(cors());
// const io = new Server(server, {
//   cors: {
//     origin: 'http://localhost:3000',
//     method: ['GET', 'POST'],
//   },
// });

// io.on('connection', (socket) => {
//   console.log(`User Connect:${socket.id}`);
// });

AppDataSource.initialize()
  .then(async () => {
    console.log('Now its running');
    app.use(express.json());
    app.use(studentsRoutes);

    const io = new Server(server, {
      cors: {
        origin: 'http://localhost:3000',
        method: ['GET', 'POST'],
      },
    });

    io.on('connection', (socket) => {
      console.log(`User Connect:${socket.id}`);
      socket.on('student_data_change', () => {
        console.log('👁 data has been altered !');
        socket.broadcast.emit('refetch_data', () => {
          console.log('💿 refetching data...');
        });
      });

      socket.on('student_added', (data) => {
        socket.broadcast.emit('student_received', data);
      });
      socket.on('student_remove', (data) => {
        socket.broadcast.emit('student_deleted', data);
      });
    });
    server.listen(8000, () => {
      console.log('Server running....port 8000');
    });
  })
  .catch((error) => console.log(error));

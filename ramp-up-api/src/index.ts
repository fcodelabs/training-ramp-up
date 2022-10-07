import { AppDataSource } from './utilis/data-source';
const http = require('http');
import 'reflect-metadata';
const cors = require('cors');
import * as express from 'express';
import student_routes from './routes/student_routes';
import user_routes from './routes/user_routes';
const { Server } = require('socket.io');
const app = express();
const server = http.createServer(app);
app.use(cors());

AppDataSource.initialize()
  .then(async () => {
    console.log('Database Connection Succes !!');

    app.use(express.json());
    app.use(student_routes);
    app.use(user_routes);
    const io = new Server(server, {
      cors: {
        origin: 'http://localhost:3000',
        method: ['GET', 'POST'],
      },
    });
    io.on('connection', (socket) => {
      console.log(`User Connect:${socket.id}`);
      socket.on('student_data_change', () => {
        console.log('data has been altered !');
        socket.broadcast.emit('refetch_data', () => {
          console.log('refetching data...');
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
      console.log('Now running on port 8000');
    });
  })
  .catch((error) => console.log(error));

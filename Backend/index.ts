import 'reflect-metadata';
import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import studentRoutes from '../Backend/src/routes/StudentRoutes';
import cors from 'cors';
import { appDataSource } from './src/configs/dataSourceConfig';
import { Server } from 'socket.io';
import http from 'http';

dotenv.config();

const app = express();
const port = process.env.PORT;
const httpServer = http.createServer(app);

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    credentials: true,
    origin: ['http://localhost:3000', 'production domain'],
  })
);

app.use('/student', studentRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('This is a test web page!');
});

export const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:3000/',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  },
});

io.on('connection', (socket) => {
  console.log(`connect ${socket.id}`);

  socket.on('disconnect', (reason) => {
    console.log('Got disconnect due to ' + reason + '!');
  });
});

appDataSource
  .initialize()
  .then(() => {
    console.log('Database is connected!');
  })
  .catch((err) => {
    console.log('Database connection failed!');
    console.log(err);
  });

httpServer.listen(port, () => {
  console.log(`The application is listening on port ${port}!`);
});

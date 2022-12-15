import express, { Express } from 'express';
import dotenv from 'dotenv';
import { AppDataSource } from './src/dataSource';
import studentRoutes from './src/routes/studentRoute';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

dotenv.config();
const app: Express = express();
const httpServer = createServer(app);
const port = process.env.PORT;

app.use(express.json());
app.use(cors({ origin: '*' }));
app.use(express.urlencoded({ extended: true }));

//routes
app.use('/student', studentRoutes);

// socket.io

export const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  },
});

io.on('connection', (socket) => {
  console.log('socketId');
  console.log(`connect ${socket.id}`);

});

// express  api 
httpServer.listen(port, () => {
  console.log(`application is running on port ${port}.`);
});

// database 
AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((error) => {
    console.error('Error during Data Source initialization:', error);
  }); 

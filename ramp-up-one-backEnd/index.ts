import express, { Express } from 'express';
import dotenv from 'dotenv';
import { AppDataSource } from './src/dataSource';
import studentRoutes from './src/routes/studentRoute';
import userRoutes from './src/routes/userRoutes';
import { app, httpServer, io } from './socketServer';
import cors from 'cors';
import cookieParser from 'cookie-parser';

dotenv.config();
const port = process.env.PORT;

app.use(cookieParser());
app.use(express.json());
app.use(cors({
  credentials: true, 
  origin: 'http://localhost:3000' }));
app.use(express.urlencoded({ extended: true }));

//routes
app.use('/student', studentRoutes);
app.use('/user', userRoutes);



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

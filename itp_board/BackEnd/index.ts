import { io,app,server } from './src/utils/app';
import studentRouter from './src/routes/stuedentRouter';
import userRouter from "./src/routes/userRouter";
import morgan from 'morgan';
import express, { Express } from 'express';
import dotenv from 'dotenv';
import cookieParser from "cookie-parser"

dotenv.config();
const port = process.env.PORT;
app.use(morgan('tiny'));
app.use(express.json());
app.use(cookieParser());

app.use('/students', studentRouter);
app.use('/user', userRouter);

server.listen(port, () => {
  console.log(`[Server]:Running at localhost:${port}`);
});

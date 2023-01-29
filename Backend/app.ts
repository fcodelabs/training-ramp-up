import 'reflect-metadata';
import express from 'express';
import { Server } from 'socket.io';
import http from 'http';

export const app = express();
export const httpServer = http.createServer(app);

export const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:3000/',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  },
});

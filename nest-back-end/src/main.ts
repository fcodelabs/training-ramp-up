import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import http from 'http';
import { Server } from 'socket.io';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const io = new Server(app.getHttpServer(), {
    cors: {
      origin: 'http://localhost:3000',
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
    },
  });
  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  });
  app.use(cookieParser());

  io.on('connection', (socket) => {
    console.log('a user connected', socket.id);

    socket.on('user_added', (data) => {
      console.log('user_added', data);
      socket.broadcast.emit('user_added', data);
    });
    socket.on('user_updated', (data) => {
      console.log('user_updated', data);
      socket.broadcast.emit('user_updated', data);
    });
    socket.on('user_removed', (data) => {
      console.log('user_removed', data);
      socket.broadcast.emit('user_removed', data);
    });
  });

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3002);
}
bootstrap();

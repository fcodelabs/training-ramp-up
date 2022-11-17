import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { Server } from 'socket.io';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    credentials: true,
    origin: ['http://localhost:3000', 'your-production-domain'],
  });
  app.use(cookieParser());

  const httpServer = app.getHttpServer();

  const io = new Server(httpServer, {
    cors: {
      origin: 'http://localhost:3000/',
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
    },
  });

  io.on('connection', (socket) => {
    console.log(`connect ${socket.id}`);

    socket.on('student_add', (data) => {
      socket.broadcast.emit('student_added', data);
    });

    socket.on('student_update', (data) => {
      socket.broadcast.emit('student_updated', data);
    });

    socket.on('student_delete', (data) => {
      socket.broadcast.emit('student_deleted', data);
    });
  });

  await app.listen(8000);
}
bootstrap();

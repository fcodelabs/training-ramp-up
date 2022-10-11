import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { Server } from 'socket.io';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const PORT = 5000;

  app.enableCors();

  const server = app.getHttpServer();

  const io = new Server(server, {
    cors: {
      origin: 'http://localhost:3000',
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    console.log(`User is connected: ${socket.id}`);

    socket.on('student_added', (data) => {
      socket.broadcast.emit('student_received', data);
    });
    socket.on('student_edit', (data) => {
      socket.broadcast.emit('student_updated', data);
    });
    socket.on('student_remove', (data) => {
      socket.broadcast.emit('student_deleted', data);
    });
  });

  await app.listen(5000, () =>
    console.log(`Server running on port: http://localhost:${PORT}`),
  );
}
bootstrap();

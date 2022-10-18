import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
const cors = require('cors');

const { Server } = require('socket.io');

// import UserMiddleware from './middleware/user.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.use(cors());
  const server = app.getHttpServer();
  const io = new Server(server, {
    cors: {
      origin: 'http://localhost:3000',
      method: ['GET', 'POST', 'PUT', 'DELETE'],
    },
  });

  io.on('connection', (socket) => {
    console.log(`User Connect:${socket.id}`);

    socket.on('student_added', (data) => {
      socket.broadcast.emit('student_received', data);
    });
    socket.on('student_remove', (data) => {
      socket.broadcast.emit('student_deleted', data);
    });
  });
  // app.use(UserMiddleware);
  await app.listen(8080);
}
bootstrap();

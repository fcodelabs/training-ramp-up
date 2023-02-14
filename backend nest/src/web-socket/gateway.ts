/* eslint-disable prettier/prettier */
import { OnModuleInit } from '@nestjs/common';
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

const options = {
  cors: {
    origin: ['http://localhost:3000'],
    credentials: true,
  },
};

@WebSocketGateway(3001, options)
export class gateWay implements OnModuleInit {
  @WebSocketServer()
  server: Server;

  onModuleInit() {
    this.server.on('connection', (socket) => {
      console.log('Client connected');
      socket.on('disconnect', () => console.log('Client disconnected'));
    });
  }
  sendNotification(message: string) {
    this.server.emit('notification', message);
  }
}

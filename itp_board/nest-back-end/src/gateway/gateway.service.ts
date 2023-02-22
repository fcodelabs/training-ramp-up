import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Logger, OnModuleInit } from '@nestjs/common';

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  },
})
export class GatewayService implements OnModuleInit {
  @WebSocketServer()
  server: Server;
  logger = new Logger();

  onModuleInit() {
    this.server.on('connection', (socket) => {
      this.logger.log(`${socket.id} connected`);
    });
  }

  sendNew(type: string, id: number) {
    this.server.emit(type, id);
  }
}

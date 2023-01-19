/* eslint-disable prettier/prettier */
import { Logger } from '@nestjs/common';
import { OnGatewayConnection, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Socket } from 'dgram';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    allowedHeaders: ['Accept-Version', 'Authorization', 'Credentials', 'Content-Type'],
  },
})
export class EventsGateway implements OnGatewayConnection{

  @WebSocketServer()
  webSocketServer: Server;

  private logger = new Logger('AppGateway')

  async handleConnection(client: Socket) {
    this.logger.log(`Socket successfully connected ${client}`)
    // client.emit('connection', 'Socket connected successfully');
  }

  // @SubscribeMessage('notification')
  // async handleEvent(client: Socket, data: string): Promise<string> {
  //   return data;
  // }
}


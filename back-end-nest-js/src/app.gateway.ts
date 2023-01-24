/* eslint-disable prettier/prettier */
import { Logger } from '@nestjs/common';
import { OnGatewayConnection, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Socket } from 'dgram';

@WebSocketGateway()
export class AppGateway implements OnGatewayConnection{

  @WebSocketServer()
  webSocketServer;

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

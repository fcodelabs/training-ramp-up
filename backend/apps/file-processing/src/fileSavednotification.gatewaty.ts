import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway(8100, {
  cors: '*',
})
export class FileSavedNotificationGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('message_to_server')
  handleMessage(@MessageBody() data: string): void {
    this.server.emit('file_save_message', data);
  }
}

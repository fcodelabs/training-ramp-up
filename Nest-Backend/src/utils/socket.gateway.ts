import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';

@WebSocketGateway()
export class SocketGateway {
  @WebSocketServer() server: any;

  async handleConnection(client: any) {
    console.log('Client connected', client.id);
  }

  async emitEvent(event: string, data: any) {
    this.server.emit(event, data);
  }
}

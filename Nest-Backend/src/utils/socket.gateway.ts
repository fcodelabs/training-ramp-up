import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';

@WebSocketGateway()
export class SocketGateway {
  @WebSocketServer() server: any;

  async handleConnection(client: any): Promise<void> {
    console.log('Client connected', client.id);
  }

  async emitEvent(event: string, data: any): Promise<void> {
    this.server.emit(event, data);
  }
}

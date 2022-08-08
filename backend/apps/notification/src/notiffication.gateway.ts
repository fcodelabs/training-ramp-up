import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse } from "@nestjs/websockets";
import { Server } from "socket.io";


@WebSocketGateway(8000, {
    cors: '*',
})
export class NotificationGateway {
    @WebSocketServer()
    server: Server;

    @SubscribeMessage('message_to_server')
    handleMessage(
        @MessageBody() data: string,
    ): void {
        this.server.emit("message_to_client", data);
    }



}
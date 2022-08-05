import { Logger } from '@nestjs/common';
import {
 
  MessageBody,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  
} from '@nestjs/websockets';

import { Socket, Server } from 'socket.io';

@WebSocketGateway(3077, { cors: '*' })
export class AppGateway implements OnGatewayInit {
  @WebSocketServer() wss: Server;

  private logger: Logger = new Logger('AppGateway');
  afterInit(server: Server) {
    this.logger.log('initialized!');
  }

  // handleDisconnect(client: Socket) {
  //   this.logger.log(`client Disconnected: ${client.id} `);
  // }

  // handleConnection(client: Socket) {
  //   this.logger.log(`client connected :${client.id} `)
  // }


  //Events

  @SubscribeMessage('addStudent')
  handleAddingStudent(@MessageBody() addStudent: string): void {
    console.log(addStudent);
    this.wss.emit('addStudent', addStudent);
  }

  @SubscribeMessage('updateStudent')
  handleUpdatingStudent(@MessageBody() updateStudent: string): void {
    console.log(updateStudent);
    this.wss.emit('updateStudent', updateStudent);
  }
  @SubscribeMessage('removeStudent')
  handleRemovingStudent(@MessageBody() removeStudent: string): void {
    console.log(removeStudent)
    this.wss.emit('removeStudent', removeStudent);
  }
  @SubscribeMessage('fileUpload')
  handlefileUploading(@MessageBody() fileUpload: string): void {
    console.log(fileUpload);
    this.wss.emit('fileUpload', fileUpload);
  }
}

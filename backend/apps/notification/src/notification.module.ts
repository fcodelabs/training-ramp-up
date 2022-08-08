import { Module } from '@nestjs/common';
import { NotificationGateway } from './notiffication.gateway';

@Module({
  imports: [],
  controllers: [],
  providers: [NotificationGateway],
})
export class NotificationModule { }

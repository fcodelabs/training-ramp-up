import { Module } from '@nestjs/common';

import { AppGateway } from './notification.gateway';


@Module({
  imports: [],
  controllers: [],
  providers: [AppGateway],
})
export class NotificationModule {}

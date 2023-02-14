import { Module } from '@nestjs/common';
import { gateWay } from './gateway';

@Module({
  providers: [gateWay],
})
export class WebSocketModule {}

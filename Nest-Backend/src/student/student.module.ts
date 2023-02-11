import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SocketGateway } from 'src/utils/socket.gateway';
import { StudentController } from './controller/student.controller';
import { StudentEntity } from './models/student.entity';
import { StudentService } from './service/student.service';

@Module({
  imports: [TypeOrmModule.forFeature([StudentEntity])],
  controllers: [StudentController],
  providers: [StudentService, SocketGateway],
})
export class StudentModule {}

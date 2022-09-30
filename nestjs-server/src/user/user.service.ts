import { Injectable } from '@nestjs/common';
// import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  findOne(): string {
    return 'authorized';
  }
}

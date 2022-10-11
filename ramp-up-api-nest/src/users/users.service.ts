import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { User } from '../entity/user.entity';
import { UserDto } from '../dto/user.dto';

@Injectable()
export class UsersService {
  constructor(private dataSource: DataSource) {}

  async findUser(userName: string): Promise<any> {
    const userRepository = this.dataSource.getRepository(User);
    try {
      return await userRepository.findOne({
        where: { username: `${userName}` },
      });
    } catch (e) {
      return Error('Getting user failed');
    }
  }

  async createUser(newUser: UserDto): Promise<any> {
    return this.dataSource.manager.save(User, newUser);
  }

  async updateUser(userName: string, user: UserDto): Promise<any> {
    return this.dataSource.manager.update(User, { username: userName }, user);
  }
}

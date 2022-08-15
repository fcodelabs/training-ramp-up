import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserCreateDto } from './dto/create.user.input';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) { }

  async create(user: UserCreateDto): Promise<User> {
    let userObj: User = this.userRepository.create(user);
    return await this.userRepository.save(userObj);
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find({
      where: {
        isArchive: false
      }
    })

  }

  async findOne(email: string): Promise<User[]> {
    return await this.userRepository.find({
      where: {
        email,
        isArchive: false
      }
    })
  }
}

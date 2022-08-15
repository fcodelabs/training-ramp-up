import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserCreateDto } from './dto/create.user.input';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) { }

  async create(user: UserCreateDto): Promise<User> {
    const saltRounds = 10;
    const userObj = {
      email: user.email,
      password: bcrypt.hashSync(user.password, saltRounds),
      isArchive: user.isArchive
    }
    const createdUserObj = this.userRepository.create(userObj);
    return await this.userRepository.save(createdUserObj);
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

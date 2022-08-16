import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.input';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) { }

  async create(email: string, password: string): Promise<User> {
    const saltRounds = 10;
    const userObj = {
      email,
      password: bcrypt.hashSync(password, saltRounds),
      hashedRefreshToken: "",
    }
    const createdUserObj: User = this.userRepository.create(userObj);
    return await this.userRepository.save(createdUserObj);
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(email: string): Promise<User[]> {
    return await this.userRepository.find({
      where: {
        email,
      }
    })
  }

  async update(user: UpdateUserDto, refresh_token: string): Promise<User | string> {
    const newUserObj = {
      ...user,
      hashedRefreshToken: refresh_token,
    }

    let newUser: User = this.userRepository.create(newUserObj);
    newUser.id = user.id;
    return this.userRepository.save(newUser)

  }
}

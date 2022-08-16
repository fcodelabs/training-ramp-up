import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { UserCreateDto } from './dto/create.user.input';
import { UpdateUserDto } from './dto/update-user.input';
import { User } from './entities/user.entity';
@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) { }

  async create(user: UserCreateDto): Promise<User> {
    const saltRounds = 10;
    const userObj = {
      email: user.email,
      password: bcrypt.hashSync(user.password, saltRounds),
      hashedRefreshToken: "",
    }
    const createdUserObj: User = this.userRepository.create(userObj);
    return await this.userRepository.save(createdUserObj);
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find()

  }

  async findOne(email: string): Promise<User[]> {
    return await this.userRepository.find({
      where: {
        email,
      }
    })
  }

  async update(id: string, user: UpdateUserDto): Promise<User | string> {
    let newUser: User = this.userRepository.create(user);
    newUser.id = id;
    return this.userRepository.save(newUser)

  }
}

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { SignedUpUserDto } from './dto/signedUpUser.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<SignedUpUserDto> {
    const alreadyIn = await this.findOne(createUserDto.email);
    if (alreadyIn) {
      throw new HttpException('Already used email.', HttpStatus.BAD_REQUEST);
    }
    const saltOrRounds = 10;
    const pwd = createUserDto.password;
    const hashedPassword = await bcrypt.hash(pwd, saltOrRounds);
    const user = {
      ...createUserDto,
      password: hashedPassword,
      admin: false,
    };
    const newUser = await this.userRepository.create(user);
    const response = await this.userRepository.save(newUser);
    const { password, ...rest } = response;
    return rest;
  }

  async findOne(email: string): Promise<CreateUserDto> {
    const user = await this.userRepository.findOneBy({ email });
    return user;
  }
}

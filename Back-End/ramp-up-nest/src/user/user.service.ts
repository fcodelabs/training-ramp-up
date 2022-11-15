import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginUserDto, RegisterUserDto } from '../dto/user.dto';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { UserInterface } from './user.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<UserInterface>,
  ) {}

  async createUserService(newUser: RegisterUserDto) {
    try {
      const user = new User();
      user.name = newUser.name;
      user.email = newUser.email;
      user.password = newUser.password;
      return await this.userRepository.save(user);
    } catch (err) {
      console.log(err);
    }
  }

  async loginUserService(userData: LoginUserDto) {
    try {
      const findUser = await this.userRepository.findOneBy({
        email: userData.email,
      });
      if (!findUser) {
        console.log('User Not Found');
      } else {
        const checkPassword = await bcrypt.compare(
          userData.password,
          findUser.password,
        );
        if (!checkPassword) {
          console.log('Password Not Match');
        } else {
          return findUser;
        }
      }
    } catch (err) {
      console.log(err);
    }
  }
}

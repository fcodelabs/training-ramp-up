import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from 'src/dto/user.dto';
import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
const bcrypt = require('bcrypt');
const saltRounds = 10;
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async userRegister(details: UserDto) {
    try {
      const checkUser = await this.userRepository.findOneBy({
        email: details.email,
      });

      if (checkUser == null) {
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(details.password, salt);
        console.log('Hash', hash);

        const { name, email } = details;
        const user = await this.userRepository.save({
          name: name,
          email: email,
          password: hash,
          role: 'User',
        });

        return user;
      } else {
        return { error: 'user was here' };
      }
    } catch (error) {
      console.log('Register Error', error);
    }
  }

  async loginUser(details) {
    try {
      const user = await User.findOneBy({ email: details.email });

      if (!user) {
        console.log('User not found');
      } else {
        const value = await bcrypt.compare(details.password, user.password);

        if (!value) {
          console.log('Password not match');
        } else {
          return { user: user, id: user.id };
        }
      }
    } catch (error) {
      return { error: 'login service Error' };
    }
  }
}

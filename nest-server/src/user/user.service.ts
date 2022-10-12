import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entity/user.entity';
import { Users } from '../dto/user.dto';
import { Repository } from 'typeorm';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require('bcrypt');
const saltRounds = 10;

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<Users>,
  ) {}

  async createUser(user: Users) {
    console.log('first', user);
    try {
      const checkUser = await User.findOneBy({ email: user.email });
      if (checkUser == null) {
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(user.password, salt);

        const newUser = await User.save({
          name: user.name,
          email: user.email.toLowerCase(),
          password: hash,
          role: 'User',
        });
        return await this.userRepo.save(newUser);
      } else {
        console.log('user Already Here');
      }
    } catch (error) {
      // return { error: 'catch error' };
      return error;
    }
  }

  async logUser(reqUser: Users) {
    try {
      const userFind = await User.findOneBy({ email: reqUser.email });
      if (!userFind) {
        console.log('User not here email');
      } else {
        const value = await bcrypt.compare(reqUser.password, userFind.password);
        if (!value) {
          console.log('User not here');
        } else {
          return userFind;
        }
      }
    } catch (error) {
      return error;
    }
  }
}

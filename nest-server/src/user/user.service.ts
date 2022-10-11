import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { Users } from 'src/entity/user.interface';
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
      return error;
    }
  }

  async logUser(reqUser: Users) {
    try {
      console.log('user', reqUser);

      const userFind = await User.findOneBy({ email: reqUser.email });
      if (!userFind) {
        console.log('User not here email');
      } else {
        const value = await bcrypt.compare(reqUser.password, userFind.password);
        console.log('Value', value);
        if (!value) {
          console.log('User not here');
        } else {
          return userFind;
        }
      }

      //   return await this.userRepo.save(user);
    } catch (error) {
      return error;
    }
  }
}

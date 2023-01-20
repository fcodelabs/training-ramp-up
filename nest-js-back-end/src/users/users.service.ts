import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import {
  CreateUserDto,
  LoginUserDto,
  UserDetailDto,
} from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { config } from '../config';
@Injectable()
export class UsersService {
  private readonly logger = new Logger('UsersService');

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<CreateUserDto>
  ) {}

  async create(createUserDto: CreateUserDto): Promise<CreateUserDto> {
    try {
      const user = new User();
      user.email = createUserDto.email;
      user.name = createUserDto.name;
      user.userRoll = createUserDto.userRoll;

      const tempPassword = createUserDto.password;
      const hash = await bcrypt.hash(tempPassword, 10);
      user.password = hash;

      const response: CreateUserDto = await this.userRepository.save(user);
      //if (response) return response;
      //else return false;
      return response;
    } catch (err) {
      throw err;
    }
  }

  findAll() {
    return 'This action returns all users';
  }

  async findOne(data: LoginUserDto): Promise<CreateUserDto | false> {
    try {
      const findUser: CreateUserDto = await this.userRepository.findOneBy({
        email: data.email,
      });
      if (findUser) {
        const isValid = await bcrypt.compare(data.password, findUser.password);
        if (isValid) {
          return findUser;
        } else {
          this.logger.log('invalid password..!');
          return false;
          //throw new NotFoundException('invalid password..!');
        }
      } else {
        this.logger.log('No such a User..!');
        return false;
        //throw new NotFoundException('No such a User..!');
      }
    } catch (err) {
      throw err;
    }
  }

  async getUserDetails(userAccToken: string): Promise<UserDetailDto> {
    try {
      const verifyAccToken = jwt.verify(userAccToken, config.jwt_secret_key);
      if (!verifyAccToken) {
        console.log('Unauthorized');
      } else {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        const userEmail = verifyAccToken.email;
        const findUser = await this.userRepository.findOneBy({
          email: userEmail,
        });
        if (findUser !== null) {
          const userData = {
            email: findUser.email,
            name: findUser.name,
            userRoll: findUser.userRoll,
          };
          return userData;
        }
      }
    } catch (err) {
      throw err;
    }
  }

  async refreshService(refreshToken: string): Promise<CreateUserDto> {
    try {
      console.log('refresh working...2');
      const verifyRefToken = jwt.verify(refreshToken, config.jwt_secretRe_key);
      if (!verifyRefToken) {
        console.log('Unauthorized');
      } else {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        const userEmail = verifyRefToken.email;
        const findUser = await this.userRepository.findOneBy({
          email: userEmail,
        });
        if (findUser) {
          return findUser;
        }
      }
    } catch (err) {
      throw err;
    }
  }
  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}

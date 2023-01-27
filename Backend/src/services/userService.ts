import { DeepPartial } from 'typeorm';
import { appDataSource } from '../configs/dataSourceConfig';
import * as dotenv from 'dotenv';
import { User } from '../models/userModel';
import bcrypt from 'bcryptjs';
import { RoleEnumType } from '../models/userModel';

dotenv.config();

interface UserType {
  id: number;
  email: string;
  password: string;
  role: string;
}

export const createUser = async (user: DeepPartial<UserType>) => {
  try {
    const hashedPassword = await bcrypt.hash(user.password as string, 10);
    try {
      const newUser = await appDataSource.manager.save(User, {
        email: user.email,
        password: hashedPassword,
        role: RoleEnumType.USER,
      });
      return newUser;
    } catch (error) {
      throw new Error('Already exists for this email').message;
    }
  } catch (err) {
    throw new Error(err as string).message;
  }
};

export const loginUser = async (email: string, password: string) => {
  try {
    const userRepo = appDataSource.getRepository(User);
    const user = await userRepo.findOneBy({ email: email });
    if (!user) throw new Error('User not found').message;
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Incorrect password').message;
    }
    return user;
  } catch (error) {
    throw new Error(error as string).message;
  }
};

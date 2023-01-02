/* eslint-disable @typescript-eslint/no-explicit-any */
import { User } from '../entities/User';
import { DeepPartial } from 'typeorm';
import bcrypt from 'bcryptjs';
import dataSource from '../dataSource';
import UserType from '../interfaces/UserType';
import * as dotenv from 'dotenv';

dotenv.config();
// add users

export const createUserService = async (user: DeepPartial<UserType>) => {
  try {
    const hashedPassword = await bcrypt.hash(user.password as string, 12);
    user.password = hashedPassword as any;
    const userRepository = dataSource.getRepository(User);
    await userRepository.save(userRepository.create(user as any));
    return user;
  } catch (err) {
    console.log(err);
    return { err: 'New user adding failed into the database' };
  }
};

// login user

export const loginService = async (email: string, password: string) => {
  try {
    // localStorage.setItem('email', email);
    const userRepository = dataSource.getRepository(User);
    const userFound = await userRepository.findOneBy({ email: email });
    if (userFound) {
      const isMatch = bcrypt.compare(password, userFound.password);
      return isMatch;
    }
  } catch (err) {
    console.log(err);
    return { err: 'Invalid Email or Password' };
  }
};

import { User } from '../entities/userEntity';
import { AppDataSource } from '../dataSource';
import { UserModel } from '../utils/interfaces';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { config } from '../utils/config';

const userRepository = AppDataSource.getRepository(User);
 
//save new user
export const saveUserService = async (data: UserModel) => {
  try {
      const user = new User();
      user.email = data.email;
      user.name = data.name;
      user.userRoll = data.userRoll;

      const tempPassword = data.password;
      const hash = await bcrypt.hash(tempPassword, 10);
      user.password = hash;

      const newUser:UserModel = await userRepository.save(user);
  
      return newUser;
   
  } catch (err) {
    return { err: 'Registration Failed' };
  }
};

//log in user
export const getUser = async (data: UserModel) => {
  try {
    const findUser:UserModel = await userRepository.findOneBy({ email: data.email });
    if (findUser) {
      const isValid = await bcrypt.compare(data.password, findUser.password);
      if (isValid) {
        return findUser;
      } else {
        return false;
      }
    } else {
      return false;
    }
  } catch (err) {
    return { err: 'Login Failed' };
  }
};

//refresh
export const refreshService = async (refreshToken: string) => {
  try {
    const verifyRefToken = jwt.verify(refreshToken, config.jwt_secretRe_key);
    if (!verifyRefToken) {
      console.log('Unauthorized');
    } else {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      const userEmail = verifyRefToken.email;
      const findUser = await userRepository.findOneBy({
        email: userEmail,
      });
      if (findUser) {
        return findUser;
      }
    }
  } catch (err) {
    console.log('Get New Access Token Eroor ', err);
    return { err: 'Cannot Get New Access Token' };
  }
};

//user details
export const getUserDetails = async (userAccToken: string) => {
  try {
    const verifyAccToken = jwt.verify(userAccToken, config.jwt_secret_key);
    if (!verifyAccToken) {
      console.log('Unauthorized');
    } else {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      const userEmail = verifyAccToken.email;
      const findUser = await userRepository.findOneBy({
        email: userEmail,
      });
      // const secret = config.jwt_secret_key;
      if (findUser !== null) {
        const userData = {
          email: findUser.email,
          name: findUser.name,
          userRoll: findUser.userRoll,
        };
        return {
          userData,
        };
      }
    }
  } catch (err) {
    console.log('Get New Access Token Eroor ', err);
    return { err: 'Cannot Get New Access Token' };
  }
};

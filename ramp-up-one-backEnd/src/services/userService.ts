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
    const findUser = await userRepository.findOneBy({ email: data.email });
    if (!findUser) {
      const user = new User();
      user.email = data.email;
      user.name = data.name;
      user.userRoll = data.userRoll;

      const tempPassword = data.password;
      const hash = await bcrypt.hash(tempPassword, 10);
      user.password = hash;

      const newUser = await userRepository.save(user);
      // return newUser;
      const dataStoredInToken = {
        email: newUser.email,
        name: newUser.name,
        userRoll: newUser.userRoll,
      };
      return {
        newAccessToken: jwt.sign(dataStoredInToken, config.jwt_secret_key, {
          expiresIn: 60 * 60,
        }),
        newRefreshToken: jwt.sign(dataStoredInToken, config.jwt_secret_key, {
          expiresIn: 60 * 60 * 24 * 1000,
        }),
      };
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
  }
};

//log in user
export const getUser = async (data: UserModel) => {
  try {
    const findUser = await userRepository.findOneBy({ email: data.email });
    if (findUser) {
      const isValid = await bcrypt.compare(data.password, findUser.password);
      if (isValid) {
        const dataStoredInToken = {
          email: data.email,
          userRoll: findUser.userRoll,
        };

        return {
          newAccessToken: jwt.sign(dataStoredInToken, config.jwt_secret_key, {
            expiresIn: 60 * 60,
          }),
          newRefreshToken: jwt.sign(
            dataStoredInToken,
            config.jwt_secretRe_key,
            {
              expiresIn: 60 * 60 * 24 * 1000,
            }
          ),
        };
      } else {
        return isValid;
      }
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
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
      const secret = config.jwt_secret_key;
      if (findUser !== null) {
        const tokenData = {
          email: findUser.email,
          userRoll: findUser.userRoll,
        };
        const newAccessToken = jwt.sign(tokenData, secret, {
          expiresIn: 60 * 60,
        });
        return {
          newAccessToken,
          tokenData,
        };
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

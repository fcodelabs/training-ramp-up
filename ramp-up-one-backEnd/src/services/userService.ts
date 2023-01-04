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

    const tempPassword = data.password;
    const hash = await bcrypt.hash(tempPassword, 10);
    user.password = hash;
    
    const newUser = await userRepository.save(user);
    // return newUser;
    const dataStoredInToken = {
      email: newUser.email,
      name: newUser.name
    };
    return {
      newAccessToken: jwt.sign(dataStoredInToken, config.jwt_secret_key, {
        expiresIn: 60 * 60,
      }),
      newRefreshToken: jwt.sign(dataStoredInToken, config.jwt_secret_key, {
        expiresIn: 60 * 60 * 24,
      }),
    };


  } catch (err) {
    console.log(err);
  }
};

//log in user
export const getUser = async (data: UserModel) => {
  
  try {
    const findUser = await userRepository.findOneBy({ email: data.email });
    if (findUser !== null) {
      if (data.pageName === 'signUpPage') {
        return true;
      } else {
        const isValid = await bcrypt.compare(data.password, findUser.password); 
        // return isValid?data.email:isValid;
        if(isValid){
          // return data.email;
          const dataStoredInToken = {
            email: data.email,
          };
          return {
            newAccessToken: jwt.sign(dataStoredInToken, config.jwt_secret_key, {
              expiresIn: '1h',
            }),
            newRefreshToken: jwt.sign(
              dataStoredInToken,
              config.jwt_secretRe_key,
              {
                expiresIn: '24h',
              }
            ),
          };
        }else{
          return isValid;
        }
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
  console.log('rf token from service-', refreshToken);
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
        };
        const newAccessToken = jwt.sign(tokenData, secret, {
          expiresIn: '1h',
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
import { User } from '../entities/userEntity';
import { AppDataSource } from '../dataSource';
import { UserModel } from '../utils/interfaces';
import bcrypt from 'bcrypt';
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
    return newUser;
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
        return isValid;
      }
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
  }
};

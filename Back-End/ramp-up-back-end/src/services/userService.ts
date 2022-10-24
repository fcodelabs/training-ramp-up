import { User } from "../entities/userEntity";
import { AppDataSource } from "../dataSource";
import * as bcrypt from "bcrypt";

const userRepository = AppDataSource.getRepository(User);

interface CreateUserType {
  name: string;
  email: string;
  password: string;
}

interface LoginUserType {
  email: string;
  password: string;
}

export const createUserService = async (data: CreateUserType) => {
  try {
    const user = new User();
    user.name = data.name;
    user.email = data.email;
    user.password = data.password;
    return await userRepository.save(user);
  } catch (err) {
    console.log(err);
  }
};

export const loginUserService = async (data: LoginUserType) => {
  try {
    const findUser = await userRepository.findOneBy({ email: data.email });
    if (!findUser) {
      console.log("User Not Found");
    } else {
      const checkPassword = await bcrypt.compare(
        data.password,
        findUser.password
      );
      if (!checkPassword) {
        console.log("Password Not Match");
      } else {
        return findUser;
      }
    }
  } catch (err) {
    console.log(err);
  }
};

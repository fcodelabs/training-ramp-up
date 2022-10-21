import { User } from "../entities/userEntity";
import { AppDataSource } from "../dataSource";

const userRepository = AppDataSource.getRepository(User);

interface CreateUserType {
  name: string;
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

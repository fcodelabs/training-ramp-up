import { AppDataSource } from "../data-source";
import { User } from "../entity/User";

const findUser = async (userName: string) => {
  const userRepository = AppDataSource.getRepository(User);
  try {
    return await userRepository.findOne({
      where: { username: `${userName}` },
    });
  } catch (e) {
    return Error("Getting user failed");
  }
};

const createUser = async (newUser: User) => AppDataSource.manager.save(newUser);

const updateUser = async (userName: string, user: User) =>
  AppDataSource.manager.update(User, { username: userName }, user);

export { findUser, createUser, updateUser };

import { AppDataSource } from "../data-source";
import { User } from "../entity/User";

const findUser = async (userName: string) => {
  const userRepository = AppDataSource.getRepository(User);
  const userData = await userRepository.findOne({
    where: { username: `${userName}` },
  });
  return userData;
};

const createUser = async (newUser: User) => AppDataSource.manager.save(newUser);

const updateUser = async (userName: string, user: User) =>
  AppDataSource.manager.update(User, { username: userName }, user);

export { findUser, createUser, updateUser };

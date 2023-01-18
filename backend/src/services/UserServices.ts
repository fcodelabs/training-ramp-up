import { AppDataSource } from "../configs/DataSourceConfig";
import { User } from "../models/User";

export const getAllUsersService = async (): Promise<User[]> => {
  const userRepo = AppDataSource.getRepository(User);
  const allrecords = await userRepo.find();
  return allrecords;
};

export const getUserByIdService = async (id: number): Promise<User | null> => {
  const userRepo = AppDataSource.getRepository(User);
  const user = await userRepo.findOneBy({ PersonID: id });
  return user;
};

export const createUserService = async (user: User): Promise<User> => {
  try {
    const userRepo = AppDataSource.getRepository(User);
    const userInsert = await userRepo.save(user);
    return userInsert;
  } catch (err) {
    throw new Error("Error in creating user");
  }
};

export const updateUserService = async (user: User): Promise<User> => {
  try {
    const userRepo = AppDataSource.getRepository(User);
    const userUpdate = await userRepo.save(user);
    const updateUser = await userRepo.findOneBy({ PersonID: user.PersonID });
    if (updateUser !== null) {
      return updateUser;
    } else {
      throw new Error("Error in updating user");
    }
  } catch (err) {
    throw new Error("Error in updating user");
  }
};

export const deleteUserService = async (id: number): Promise<User> => {
  const userRepo = AppDataSource.getRepository(User);
  const user = await userRepo.findOneBy({ PersonID: id });

  if (user !== null) {
    const userDelete = await userRepo.remove(user);
    userDelete.PersonID = id;
    return userDelete;
  } else {
   throw new Error("Error in updating user");
  }
};

export const deleteAllUserService = async (): Promise<User[]> => {
  const userRepo = AppDataSource.getRepository(User);
  const allrecords = await userRepo.find();
  const userDelete = await userRepo.remove(allrecords);
  return userDelete;
};

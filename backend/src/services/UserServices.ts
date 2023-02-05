import { AppDataSource } from "../configs/DataSourceConfig";
import { User } from "../models/User";
import bcrypt from "bcrypt";
import { Any, In } from "typeorm";

export const registerUserService = async (user: User) => {
    const hashedPassword = await bcrypt.hash(user.Password, 10);
    user.Password = hashedPassword;
    const userRepo = AppDataSource.getRepository(User);
    const userInsert = await userRepo.save(user);
    const { Role, Email, ...others } = userInsert;
    return { Role, Email };
};

export const loginUserService = async (user: User) => {
  const userRepo = AppDataSource.getRepository(User);
  const userLogin = await userRepo.findOneBy({ Email: user.Email });
  if (userLogin) {
    const passwordMatch = await bcrypt.compare(
      user.Password,
      userLogin.Password
    );
    if (passwordMatch) {
      return userLogin;
    } else {
      throw new Error("Incorrect password");
    }
  } else {
    throw new Error("User not found");
  }
};

export const updateRefreshTokenService = async (
  user: User,
  refreshToken: string
) => {
  const userRepo = AppDataSource.getRepository(User);
  const currentUser = await userRepo.findOneBy({ UserID: user.UserID });
  if (currentUser !== null) {
    const newUser = {
      ...currentUser,
      RefreshToken: refreshToken,
      //   RefreshToken: [...currentUser?.RefreshToken, refreshToken],
    };
    const userUpdate = await userRepo.save(newUser);
  }
};

export const findUserByRefreshTokenService = async (
  refreshToken: string
): Promise<User> => {
  const userRepo = AppDataSource.getRepository(User);

  const user = await userRepo.findOne({
    where: { RefreshToken: refreshToken },
  });

  if (user !== null) {
    return user;
  } else {
    throw new Error("User not found");
  }
};

export const deleteRefeshTokenService = async (
  user: User
): Promise<User | undefined> => {
  try {
    const userRepo = AppDataSource.getRepository(User);
    const currentUser = await userRepo.findOneBy({ UserID: user.UserID });
    if (currentUser !== null) {
      const newUser = {
        ...currentUser,
        RefreshToken: "",
      };
      const userUpdate = await userRepo.save(newUser);
      return userUpdate;
    }
  } catch (err) {
    throw new Error("Error in updating user");
  }
};

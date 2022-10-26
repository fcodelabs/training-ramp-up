import { User } from "../entities/userEntity";
import { AppDataSource } from "../dataSource";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "../utils/config";
import {
  CreateUserType,
  DataStoredInToken,
  LoginUserType,
  TokenType,
} from "./userServiceTypes";

const userRepository = AppDataSource.getRepository(User);

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

export const createToken = (user: User): TokenType => {
  const secret = config.jwt_secret_key;
  const dataStoredInToken: DataStoredInToken = {
    email: user.email,
    role: user.role,
  };
  return {
    newAccessToken: jwt.sign(dataStoredInToken, secret, { expiresIn: "1h" }),
    newRefreshToken: jwt.sign(dataStoredInToken, secret, {
      expiresIn: "24h",
    }),
  };
};

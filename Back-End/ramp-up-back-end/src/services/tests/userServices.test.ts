import { AppDataSource } from "../../dataSource";
import { User } from "../../entities/userEntity";
import { createUserService, loginUserService } from "../userService";
import bcrypt from "bcrypt";

const userRepository = AppDataSource.getRepository(User);

describe("User Service", () => {
  describe("Register User", () => {
    const newUser = {
      name: "newUser",
      email: "newUser@gmail.com",
      password: "NewU1234",
    };
    test("Register User Success", async () => {
      userRepository.save = jest.fn().mockResolvedValue(newUser);
      const res = await createUserService(newUser);
      expect(res).toEqual(newUser);
    });

    test("Register User Fail", async () => {
      userRepository.save = jest.fn().mockRejectedValue(null);
      const res = await createUserService(newUser);
      expect(res).toEqual({ err: "Registration Failed" });
    });
  });

  describe("Login User", () => {
    const loginData = {
      email: "user@gmail.com",
      password: "User1234",
    };
    const user = {
      id: 1,
      email: "user@gmail.com",
      password: "User1234",
    };
    test("Login User Success", async () => {
      userRepository.findOneBy = jest.fn().mockResolvedValue(user);
      bcrypt.compare = jest.fn().mockResolvedValue(true);
      const res = await loginUserService(loginData);
      expect(res).toEqual(user);
    });

    test("Login User Fail", async () => {
      userRepository.findOneBy = jest.fn().mockRejectedValue(null);
      const res = await loginUserService(loginData);
      expect(res).toEqual({ err: "Login Failed" });
    });
  });
});

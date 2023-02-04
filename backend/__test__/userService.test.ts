import { User } from "../src/models/User";
import { AppDataSource } from "../src/configs/DataSourceConfig";
import * as userService from "../src/services/userServices";
import { ObjectLiteral } from "typeorm";

describe("User Service test", () => {
  const user = {
    Email: "test@gmail.com",
    Password: "1234",
    Role: "admin",
  } as User;
  const user2 = {
    Password: "1234",
  } as User;
  const createUser = {
    Email: "test@gmail.com",
    Role: "admin",
  } as User;

  describe("Create user service test", () => {
    it("test create user", async () => {
      const spyAppDataSource = jest.spyOn(
        AppDataSource.getRepository(User),
        "save"
      );
      spyAppDataSource.mockResolvedValue(createUser);
      const result = await userService.registerUserService(user);
      expect(result).toEqual(createUser);
      spyAppDataSource.mockRestore();
    });
    it("test create user fail", async () => {
      const spyAppDataSource = jest.spyOn(AppDataSource.manager, "save");
      spyAppDataSource.mockResolvedValue(createUser);
      try {
        const result = await userService.registerUserService(user2);
      } catch (e) {
        expect(e).toEqual(new Error("Error in creating user"));
      }
      spyAppDataSource.mockRestore();
    });
  });
  const logindata = {
    Email: "test@gmail.com",
    Role: "admin",
    Password: "$2b$10$N/Bt000zfBw745V2/czYLuPRacADdO8X.oQd/8Xg5tSnodcJf4Zya",
    createdAt: new Date(),
    UserID: 1,
    updatedAt: new Date(),
    RefreshToken: "test",
  } as User;
  const loginUser = {
    Email: "test@gmail.com",
    Password: "1234",
  } as User;

  describe("login user service test", () => {
    it("test login user success", async () => {
      const spyAppDataSource = jest.spyOn(
        AppDataSource.getRepository(User),
        "findOneBy"
      );
      spyAppDataSource.mockResolvedValue(logindata);
      const result = await userService.loginUserService(loginUser);
      spyAppDataSource.mockRestore();
    });
    it("test login user fail", async () => {
      const spyAppDataSource = jest.spyOn(
        AppDataSource.getRepository(User),
        "findOne"
      );
      spyAppDataSource.mockResolvedValue(createUser);
      try {
        const result = await userService.loginUserService(user2);
      } catch (e) {
        expect(e).toEqual(new Error("Error in login user"));
      }
      spyAppDataSource.mockRestore();
    });
  });

});

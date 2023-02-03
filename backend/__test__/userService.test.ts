import { User } from "../src/models/User";
import { AppDataSource } from "../src/configs/DataSourceConfig";
import * as userService from "../src/services/userServices";

describe("User Service test", () => {
  const user = {
    Email: "test@gmail.com",
    Password: "1234",
    Role: "admin",
  } as User;
  const user2 = {
    Email: "test@gmail.com",
  } as unknown as User;
  const createUser = {
    Email: "test@gmail.com",
    Role: "test",
  } as unknown as User;
  describe("Create user service test", () => {
    // it("test create user", async () => {
    //   const spyAppDataSource = jest.spyOn(AppDataSource.manager, "save");
    //   spyAppDataSource.mockResolvedValue(createUser);
    //   const result = await userService.registerUserService(user);

    //   expect(result).toEqual(createUser);
   
    //   spyAppDataSource.mockRestore();
    // });
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

});

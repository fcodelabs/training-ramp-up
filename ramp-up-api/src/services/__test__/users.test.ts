import { AppDataSource } from "../../data-source";
import { User } from "../../entity/User";
import * as userService from "../users";

describe("user tests", () => {
  const user = {
    username: "Test",
    password: "Test",
  };
  describe("findUser tests", () => {
    test("User Exists", async () => {
      AppDataSource.getRepository(User).findOne = jest
        .fn()
        .mockResolvedValue(user);
      await expect(userService.findUser("Test")).resolves.toStrictEqual(user);
    });
    test("User does not exist", async () => {
      AppDataSource.getRepository(User).findOne = jest
        .fn()
        .mockRejectedValue(null);
      await expect(userService.findUser("Test")).rejects.toStrictEqual(null);
    });
  });
  describe("createUser tests", () => {
    test("User created successfully", async () => {
      AppDataSource.manager.save = jest
        .fn()
        .mockImplementation((newUser) => newUser);
      await expect(userService.createUser(user as User)).resolves.toStrictEqual(
        user
      );
    });
    test("Could not create User", async () => {
      AppDataSource.manager.save = jest
        .fn()
        .mockRejectedValue(Error("Could not create user"));
      await expect(userService.createUser(user as User)).rejects.toBeInstanceOf(
        Error
      );
    });
  });
  describe("updateUser tests", () => {
    test("User updated successfully", async () => {
      AppDataSource.manager.update = jest
        .fn()
        .mockImplementation((entity: User, name: string, user: User) => user);
      await expect(
        userService.updateUser("Test", user as User)
      ).resolves.toStrictEqual(user);
    });
    test("Could not update User", async () => {
      AppDataSource.manager.update = jest
        .fn()
        .mockRejectedValue(Error("Could not update user"));
      await expect(
        userService.updateUser("Test", user as User)
      ).rejects.toBeInstanceOf(Error);
    });
  });
});

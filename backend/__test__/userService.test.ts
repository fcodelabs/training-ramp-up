import { User } from "../src/models/user";
import { AppDataSource } from "../src/configs/DataSourceConfig";
import * as userService from "../src/services/userServices";

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
        expect(e).toEqual(new Error('No metadata for "User" was found.'));
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
  const errEmailLoginUser = {
    Email: "test@gmail.com",
    Password: "123",
  } as User;
  const errLoginUser = {
    Email: "test@gmail.com",
    Password: "123",
  } as User;
  describe("login user service test", () => {
    it("test login user success", async () => {
      const spyAppDataSource = jest.spyOn(
        AppDataSource.getRepository(User),
        "findOneBy"
      );
      spyAppDataSource.mockResolvedValue(logindata);
      const result = await userService.loginUserService(loginUser);
      expect(spyAppDataSource).lastCalledWith({ Email: loginUser.Email });
      expect(result).toEqual(logindata);
      spyAppDataSource.mockRestore();
    });
    it("test login user fail", async () => {
      const spyAppDataSource = jest.spyOn(
        AppDataSource.getRepository(User),
        "findOneBy"
      );
      spyAppDataSource.mockResolvedValue(createUser);
      try {
        const result = await userService.loginUserService(errLoginUser);
      } catch (e) {
        expect(e).toEqual(new Error("data and hash arguments required"));
      }
      spyAppDataSource.mockRestore();
    });
    it("test login user fail", async () => {
      const spyAppDataSource = jest.spyOn(
        AppDataSource.getRepository(User),
        "findOneBy"
      );
      spyAppDataSource.mockResolvedValue(null);
      try {
        const result = await userService.loginUserService(errEmailLoginUser);
      } catch (e) {
        expect(e).toEqual(new Error("User not found"));
      }

      spyAppDataSource.mockRestore();
    });
  });
  const InputUser = {
    Email: "test@gmail.com",
    Role: "admin",
    createdAt: new Date(),
    UserID: 1,
    updatedAt: new Date(),
    RefreshToken: "test",
  } as User;
  const outputUser = {
    Email: "test@gmail.com",
    Role: "admin",
    createdAt: new Date(),
    UserID: 1,
    updatedAt: new Date(),
    RefreshToken: "",
  } as User;
  describe("logout user service test", () => {
    it("test logout user success", async () => {
      const spyAppDataSource = jest.spyOn(
        AppDataSource.getRepository(User),
        "findOneBy"
      );
      const spySaveDataSource = jest.spyOn(
        AppDataSource.getRepository(User),
        "save"
      );
      spyAppDataSource.mockResolvedValue(InputUser);
      spySaveDataSource.mockResolvedValue(outputUser);
      const result = await userService.deleteRefeshTokenService(InputUser);
      spyAppDataSource.mockRestore();
    });
    it("test logout user fail", async () => {
      const spyAppDataSource = jest.spyOn(
        AppDataSource.getRepository(User),
        "findOne"
      );
      spyAppDataSource.mockResolvedValue(outputUser);
      try {
        const result = await userService.loginUserService(InputUser);
      } catch (e) {
        expect(e).toEqual(new Error('No metadata for "User" was found.'));
      }
      spyAppDataSource.mockRestore();
    });
  });
  describe("get user by refresh token service test", () => {
    it("test get user by refresh token success", async () => {
      const spyAppDataSource = jest.spyOn(
        AppDataSource.getRepository(User),
        "findOne"
      );
      spyAppDataSource.mockResolvedValue(InputUser);
      const result = await userService.findUserByRefreshTokenService(
        InputUser.RefreshToken
      );
      expect(result).toEqual(InputUser);
      spyAppDataSource.mockRestore();
    });
    it("test get user by refresh token fail", async () => {
      const spyAppDataSource = jest.spyOn(
        AppDataSource.getRepository(User),
        "findOne"
      );
      spyAppDataSource.mockRejectedValue(new Error("User not found"));
      try {
        const result = await userService.findUserByRefreshTokenService("test1");
      } catch (e) {
        expect(e).toEqual(new Error("User not found"));
      }

      spyAppDataSource.mockRestore();
    });
  });

  describe("delete refresh token service test", () => {
    const InputUser = {
      Email: "test@gmail.com",
      Role: "admin",
      createdAt: new Date(),
      UserID: 1,
      updatedAt: new Date(),
      RefreshToken: "test",
      Provider: "google",
      Password: "$2b$10$N/Bt000zfBw745V2/czYLuPRacADdO8X.oQd/8Xg5tSnodcJf4Zya",
    } as User;
    const outputUser = {
      Email: "test@gmail.com",
      Role: "admin",
      createdAt: new Date(),
      UserID: 1,
      updatedAt: new Date(),
      RefreshToken: "",
      Provider: "google",
      Password: "$2b$10$N/Bt000zfBw745V2/czYLuPRacADdO8X.oQd/8Xg5tSnodcJf4Zya",
    } as User;
    it("test delete refresh token success", async () => {
      const spyFindDataSource = jest.spyOn(
        AppDataSource.getRepository(User),
        "findOneBy"
      );
      const spySaveDataSource = jest.spyOn(
        AppDataSource.getRepository(User),
        "save"
      );
      spyFindDataSource.mockResolvedValue(InputUser);
      spySaveDataSource.mockResolvedValue(outputUser);
      const result = await userService.deleteRefeshTokenService(InputUser);
      expect(spyFindDataSource).toHaveBeenCalled();
      expect(spySaveDataSource).toHaveBeenCalled();
      expect(result).toEqual(outputUser);
      spyFindDataSource.mockRestore();
      spySaveDataSource.mockRestore();
    });
    it("test delete refresh token fail", async () => {
      const spyAppDataSource = jest.spyOn(
        AppDataSource.getRepository(User),
        "findOneBy"
      );
      spyAppDataSource.mockRejectedValue(new Error("Error in updating user"));
      try {
        const result = await userService.deleteRefeshTokenService(InputUser);
      } catch (e) {
        expect(e).toEqual(new Error("Error in updating user"));
      }
      spyAppDataSource.mockRestore();
    });
  });

  describe("finde or create user service test", () => {
    const InputUser = {
      Email: "test",
      Role: "admin",
      createdAt: new Date(),
      UserID: 1,
      updatedAt: new Date(),
      Password: "test",
    } as User;
    const outputUser = {
      Email: "test",
      Role: "admin",
      createdAt: new Date(),
      UserID: 1,
      updatedAt: new Date(),
      Password: "test",
    } as User;
    it("test find or create user success", async () => {
      const spyFindDataSource = jest.spyOn(
        AppDataSource.getRepository(User),
        "findOneBy"
      );
      const spySaveDataSource = jest.spyOn(
        AppDataSource.getRepository(User),
        "save"
      );
      spyFindDataSource.mockResolvedValue(InputUser);
      spySaveDataSource.mockResolvedValue(outputUser);
      const result = await userService.createOrfindUserService(InputUser);
      expect(spyFindDataSource).toHaveBeenCalled();
      expect(result).toEqual(outputUser);
      spyFindDataSource.mockRestore();
      spySaveDataSource.mockRestore();
    });
    it("test find or create user fail", async () => {
      const spyAppDataSource = jest.spyOn(
        AppDataSource.getRepository(User),
        "findOneBy"
      );
      spyAppDataSource.mockRejectedValue(new Error("Error in updating user"));
      try {
        const result = await userService.createOrfindUserService(InputUser);
      } catch (e) {
        expect(e).toEqual(new Error("Error in updating user"));
      }
      spyAppDataSource.mockRestore();
    });
  });

  describe("update refresh token service test", () => {
    const InputUser = {
      Email: "test",
      Role: "admin",
      createdAt: new Date(),
      UserID: 1,
      updatedAt: new Date(),
    } as User;
    const outputUser = {
      Email: "test",
      Role: "admin",
      createdAt: new Date(),
      UserID: 1,
      updatedAt: new Date(),
      Password: "test",
    } as User;
    const refreshToken = "test";
    it("test update refresh success", async () => {
      const spyFindDataSource = jest.spyOn(
        AppDataSource.getRepository(User),
        "findOneBy"
      );
      const spySaveDataSource = jest.spyOn(
        AppDataSource.getRepository(User),
        "save"
      );
      spyFindDataSource.mockResolvedValue(InputUser);
      spySaveDataSource.mockResolvedValue(outputUser);
      const result = await userService.updateRefreshTokenService(
        InputUser,
        refreshToken
      );
      expect(spyFindDataSource).toHaveBeenCalled();
      spyFindDataSource.mockRestore();
      spySaveDataSource.mockRestore();
    });
    it("test update refresh token fail", async () => {
      const spyAppDataSource = jest.spyOn(
        AppDataSource.getRepository(User),
        "findOneBy"
      );
      spyAppDataSource.mockRejectedValue(new Error("Error in updating token"));
      try {
        const result = await userService.updateRefreshTokenService(
          InputUser,
          refreshToken
        );
      } catch (e) {
        expect(e).toEqual(new Error("Error in updating token"));
      }
      spyAppDataSource.mockRestore();
    });
  });
});

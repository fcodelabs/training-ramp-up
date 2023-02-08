import * as userServices from "../src/services/userServices";
import { Request, Response } from "express";
import { User } from "../src/models/user";
import {
  loginController,
  logoutController,
  refreshTokenController,
  signUpController,
} from "../src/controllers/userController";

describe("User Constroller test", () => {
  const mockNextFuction = jest.fn();
  const response = () => {
    const res = {} as Response;
    res.status = jest.fn().mockReturnThis();
    res.send = jest.fn().mockReturnThis();
    res.json = jest.fn().mockReturnThis();
    res.cookie = jest.fn().mockReturnThis();
    res.sendStatus = jest.fn().mockReturnThis();
    return res;
  };
  describe("Create user controller test", () => {
    const user = {
      Email: "test",
      Password: "test",
      Role: "admin",
    } as User;
    const request_add = {
      body: {
        data: user,
      },
    } as Request;
    const request_add_fail = {
      body: {
        data: user,
      },
    } as Request;
    const res_add = response();

    it("test create user", async () => {
      const spyAddUser = jest
        .spyOn(userServices, "registerUserService")
        .mockResolvedValue(user);
      await signUpController(request_add, res_add, mockNextFuction);
      expect(spyAddUser).toBeCalledWith(user);
      expect(spyAddUser).toHaveBeenCalledTimes(1);
      expect(res_add.status).toHaveBeenCalledWith(201);
      expect(res_add.json).toHaveBeenCalledWith("User created successfully");
      spyAddUser.mockRestore();
    });
    it("test create user fail", async () => {
      const spyAddUser = jest
        .spyOn(userServices, "registerUserService")
        .mockRejectedValue(new Error());
      await signUpController(request_add_fail, res_add, mockNextFuction);
      expect(spyAddUser).toHaveBeenCalled();
      expect(mockNextFuction).toHaveBeenCalledWith(
        new Error("User already exists")
      );
      spyAddUser.mockRestore();
    });
  });
  describe("login user controller test", () => {
    const user = {
      accessToken:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mbyI6eyJ1c2VyUm9sZSI6ImFkbWluIiwidXNlckVtYWlsIjoidGVzdCJ9LCJpYXQiOjE2NzU4MzkzMzYsImV4cCI6MTY3NTgzOTMzOX0.fLZK-N79gwVp36NS1RX7NV9q0B7MXsrLkONQm5fAYXU",
      user: {
        Email: "test",
        Password:
          "$2b$10$yuXdJEMG5VPxuHt/sz6IDOUQQQXExgmjjCq7IuQ8a57YIVQRJT7.6",
        Role: "admin",
      },
    } as any;
    const request_login = {
      body: {
        data: user,
      },
    } as Request;
    const request_login_fail = {
      body: {
        data: user,
      },
    } as Request;
    const res_login = response();

    it("test login user", async () => {
      const spyLoginUser = jest
        .spyOn(userServices, "loginUserService")
        .mockResolvedValue(user);
      const spyRefreshTokenUpdate = jest
        .spyOn(userServices, "updateRefreshTokenService")
        .mockResolvedValue();

      await loginController(request_login, res_login, mockNextFuction);
      expect(spyLoginUser).toBeCalledWith(user);
      expect(spyLoginUser).toHaveBeenCalledTimes(1);
      expect(spyRefreshTokenUpdate).toBeCalled();
      // expect(res_login.send).toHaveBeenCalledWith(user);
      spyLoginUser.mockRestore();
    });
    it("test login user fail", async () => {
      const spyLoginUser = jest
        .spyOn(userServices, "loginUserService")
        .mockRejectedValue(new Error());
      await loginController(request_login_fail, res_login, mockNextFuction);
      expect(spyLoginUser).toHaveBeenCalled();
      expect(mockNextFuction).toHaveBeenCalledWith(new Error());
      spyLoginUser.mockRestore();
    });
  });
  describe("refresh token controller test", () => {
    const user = {
      Email: "test",
      Password: "$2b$10$yuXdJEMG5VPxuHt/sz6IDOUQQQXExgmjjCq7IuQ8a57YIVQRJT7.6",
      Role: "admin",
    } as User;
    const jwt =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiam95IiwiaWF0IjoxNjc1NTg2NTk3LCJleHAiOjE2NzY0NTA1OTd9.C4uSP1lECRx0c8QY_AZRnppVhrcKjcoucgEHzCMp3jc";
    const enterRequest = {
      cookies: {
        jwt: jwt,
      },
    } as Request;
    const enterRequest_fail = {
      cookies: {
        jwtt: undefined,
      },
    } as Request;
    const outputRes = {} as Response;
    outputRes.status = jest.fn().mockReturnThis();
    outputRes.send = jest.fn().mockReturnThis();
    outputRes.sendStatus = jest.fn().mockReturnThis();

    it("test refresh token", async () => {
      const spyOutputToken = jest
        .spyOn(userServices, "findUserByRefreshTokenService")
        .mockResolvedValue(user);
      await refreshTokenController(enterRequest, outputRes, mockNextFuction);
      expect(spyOutputToken).toBeCalledWith(jwt);
      expect(spyOutputToken).toHaveBeenCalledTimes(1);
      spyOutputToken.mockRestore();
    });
    it("test refresh token fail", async () => {
      const spyOutputToken = jest
        .spyOn(userServices, "findUserByRefreshTokenService")
        .mockRejectedValue(new Error());
      await refreshTokenController(enterRequest, outputRes, mockNextFuction);
      expect(spyOutputToken).toHaveBeenCalled();
      expect(mockNextFuction).toBeCalledWith(new Error());
      spyOutputToken.mockRestore();
    });
  });
  describe("logout user controller test", () => {
    const user = {
      Email: "test",
      Password: "$2b$10$yuXdJEMG5VPxuHt/sz6IDOUQQQXExgmjjCq7IuQ8a57YIVQRJT7.6",
      Role: "admin",
    } as User;
    const jwt =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiam95IiwiaWF0IjoxNjc1NTg2NTk3LCJleHAiOjE2NzY0NTA1OTd9.C4uSP1lECRx0c8QY_AZRnppVhrcKjcoucgEHzCMp3jc";
    const enterRequest = {
      cookies: {
        jwt: jwt,
      },
      body: {
        data: user,
      },
    } as Request;
    const enteWrongRequest_fail = {
      cookies: {
        jwt: undefined,
      },
    } as Request;

    const outputRes = {} as Response;
    outputRes.status = jest.fn().mockReturnThis();
    outputRes.send = jest.fn().mockReturnThis();

    it("test logout user", async () => {
      const spyLogoutUser = jest
        .spyOn(userServices, "deleteRefeshTokenService")
        .mockResolvedValue(user);
      await logoutController(enterRequest, outputRes, mockNextFuction);
      expect(spyLogoutUser).toBeCalledWith(user);
      expect(spyLogoutUser).toHaveBeenCalledTimes(1);
      spyLogoutUser.mockRestore();
    });
    it("test logout user fail", async () => {
      const spyLogoutUser = jest
        .spyOn(userServices, "deleteRefeshTokenService")
        .mockRejectedValue(new Error());
      await logoutController(enteWrongRequest_fail, outputRes, mockNextFuction);
      //expect(spyLogoutUser).toHaveBeenCalled();
      //expect(outputRes.sendStatus).toHaveBeenCalledWith(201);
      //expect(mockNextFuction).toBeCalledWith(new Error());
    });
  });
});

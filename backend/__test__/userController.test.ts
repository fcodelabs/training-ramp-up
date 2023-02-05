import * as userServices from "../src/services/userServices";
import { Request, Response } from "express";
import { User } from "../src/models/User";
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
      spyAddUser.mockRestore();
    });
    it("test create user fail", async () => {
      const spyAddUser = jest
        .spyOn(userServices, "registerUserService")
        .mockResolvedValue(user);
      await signUpController(request_add_fail, res_add, mockNextFuction);
      expect(spyAddUser).toBeCalledWith(user);
      spyAddUser.mockRestore();
    });
  });
  describe("login user controller test", () => {
    const user = {
      Email: "test",
      Password: "$2b$10$yuXdJEMG5VPxuHt/sz6IDOUQQQXExgmjjCq7IuQ8a57YIVQRJT7.6",
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

    it("test login user", async () => {
      const spyLoginUser = jest
        .spyOn(userServices, "loginUserService")
        .mockResolvedValue(user);
      await loginController(request_add, res_add, mockNextFuction);
      expect(spyLoginUser).toBeCalledWith(user);
      spyLoginUser.mockRestore();
    });
    it("test login user fail", async () => {
      const spyAddUser = jest
        .spyOn(userServices, "loginUserService")
        .mockResolvedValue(user);
      await loginController(request_add_fail, res_add, mockNextFuction);
      expect(spyAddUser).toBeCalledWith(user);
      spyAddUser.mockRestore();
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
      const spyOutputUser = jest
        .spyOn(userServices, "findUserByRefreshTokenService")
        .mockResolvedValue(user);
      await refreshTokenController(enterRequest, outputRes, mockNextFuction);
      expect(spyOutputUser).toBeCalledWith(jwt);
      spyOutputUser.mockRestore();
    });
    it("test refresh token fail", async () => {
      const spyOutputUser = jest
        .spyOn(userServices, "findUserByRefreshTokenService")
        .mockResolvedValue(user);
      try {
        await refreshTokenController(enterRequest, outputRes, mockNextFuction);
      } catch (e) {
        expect(e).toBeCalledWith(jwt);
      }
      spyOutputUser.mockRestore();
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
    const enterRequest_fail = {
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
      spyLogoutUser.mockRestore();
    });
    it("test logout user fail", async () => {
      const spyLogoutUser = jest
        .spyOn(userServices, "deleteRefeshTokenService")
        .mockResolvedValue(user);
      try {
        await logoutController(enterRequest_fail, outputRes, mockNextFuction);
      } catch (e) {
        expect(e).toBeCalledWith(user);
      }
      spyLogoutUser.mockRestore();
    });
  });
});

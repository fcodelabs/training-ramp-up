import * as userServices from "../src/services/userServices";
import { Request, Response } from "express";
import { User } from "../src/models/User";
import { loginController, signUpController } from "../src/controllers/userController";

describe("User Constroller test", () => {
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
    } as  Request;
    const res_add = response();

    it("test create user", async () => {
      const spyAddUser = jest
        .spyOn(userServices, "registerUserService")
        .mockResolvedValue(user);
      await signUpController(request_add, res_add);
      expect(spyAddUser).toBeCalledWith(user);
      spyAddUser.mockRestore();
    });
    it("test create user fail", async () => {
      const spyAddUser = jest
        .spyOn(userServices, "registerUserService")
        .mockResolvedValue(user);
      await signUpController(request_add_fail, res_add);
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
      await loginController(request_add, res_add);
      expect(spyLoginUser).toBeCalledWith(user);
      spyLoginUser.mockRestore();
    });
    it("test login user fail", async () => {
      const spyAddUser = jest
        .spyOn(userServices, "loginUserService")
        .mockResolvedValue(user);
      await loginController(request_add_fail, res_add);
      expect(spyAddUser).toBeCalledWith(user);
      spyAddUser.mockRestore();
    });
  });
});

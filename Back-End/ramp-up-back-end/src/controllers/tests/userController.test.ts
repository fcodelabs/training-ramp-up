import { Request, Response } from "express";
import { User } from "../../entities/userEntity";
import * as userServices from "../../services/userService";
import { loginUser, logoutUser, registerUser } from "../userController";

const mockResponse = () => {
  const res = {} as Response;
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.cookie = jest.fn().mockReturnValue(res);
  return res;
};

describe("User Controller", () => {
  describe("Register User", () => {
    const newUser = {
      id: 1,
      name: "newUser",
      email: "newUser@gmail.com",
      password: "NewU1234",
      role: "user",
      createdAt: new Date("2022-10-24 16:59:02.751605"),
      updatedAt: new Date("2022-10-24 16:59:02.751605"),
    } as User;

    const req = {
      body: {
        name: "newUser",
        email: "newUser@gmail.com",
        password: "NewU1234",
      },
    } as Request;

    const res = mockResponse();

    test("Register User Success", async () => {
      const spyRegisterUser = jest
        .spyOn(userServices, "createUserService")
        .mockResolvedValue(newUser);
      await registerUser(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.cookie).toHaveBeenCalledTimes(3);
      spyRegisterUser.mockRestore();
    });

    test("Register User Fail", async () => {
      const spyRegisterUser = jest
        .spyOn(userServices, "createUserService")
        .mockRejectedValue(null);
      await registerUser(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      spyRegisterUser.mockRestore();
    });
  });

  describe("Login User", () => {
    const user = {
      id: 1,
      name: "newUser",
      email: "newUser@gmail.com",
      password: "NewU1234",
      role: "user",
      createdAt: new Date("2022-10-24 16:59:02.751605"),
      updatedAt: new Date("2022-10-24 16:59:02.751605"),
    } as User;

    const req = {
      body: {
        email: "newUser@gmail.com",
        password: "NewU1234",
      },
    } as Request;

    const res = mockResponse();

    test("Login User Success", async () => {
      const spyLoginUser = jest
        .spyOn(userServices, "loginUserService")
        .mockResolvedValue(user);
      await loginUser(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.cookie).toHaveBeenCalledTimes(3);
      spyLoginUser.mockRestore();
    });

    test("Login User Fail", async () => {
      const spyLoginUser = jest
        .spyOn(userServices, "loginUserService")
        .mockRejectedValue(null);
      await loginUser(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      spyLoginUser.mockRestore();
    });
  });

  describe("Logout User", () => {
    const req = {} as Request;

    const res = mockResponse();

    test("Logout User Success", () => {
      logoutUser(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.cookie).toHaveBeenCalledTimes(3);
    });
  });
});

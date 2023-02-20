import * as userServices from "../src/services/userServices";
import { Request, Response, NextFunction } from "express";
import { User } from "../src/models/UserModel";
import {
  login,
  logout,
  handleRefreshToken,
} from "../src/controllers/authController";

describe("Sign In User Test", () => {
  const user1 = {
    email: "piyumi@gmail.com",
    password: "Admin@123",
    userRole: "admin",
  } as any;

  const res = {
    status: jest.fn().mockReturnThis(),
    cookie: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  } as unknown as Response;
  const req = {
    body: {
      email: "piyumi@gmail.com",
      password: "Admin@123",
    },
  } as unknown as Request;

  it("sign in user successfully", async () => {
    jest.spyOn(userServices, "loginService").mockResolvedValue(user1);
    await login(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.cookie).toBeCalledTimes(1);
    expect(res.status).toBeCalledTimes(1);
    expect(res.json).toBeCalledTimes(1);
  });

  it("sign in user failed", async () => {
    jest.spyOn(userServices, "loginService").mockResolvedValue(null);
    await login(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
  });
});

describe("Logout User Test", () => {
  it("should succesfully logout if token is provided", async () => {
    const req = { cookies: { jwt: "1112222" } } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnValue({ send: jest.fn() }),
      clearCookie: jest.fn(),
    } as unknown as Response;

    await logout(req, res);

    expect(res.clearCookie).toHaveBeenCalledWith("jwt", {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.status(200).send).toHaveBeenCalledWith({
      data: "Logout successfully!",
      statusCode: 200,
      message: "success",
    });
  });

  it("should return no token provided", async () => {
    const req = { cookies: {} } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnValue({ send: jest.fn() }),
    } as unknown as Response;

    await logout(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.status(401).send).toHaveBeenCalledWith({
      data: "Unauthorized",
      statusCode: 401,
      message: "error",
    });
  });
});

describe("Handle refresh token", () => {
  test("When token in cookie should handle", async () => {
    const res = {
      status: jest.fn().mockReturnThis(),
      cookie: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    } as unknown as Response;
    const req = {
      body: {
        email: "piyumi@gmail.com",
        password: "Admin@123",
      },
      cookies: {
        jwt: "hjhvdvvfuhhucdihhudg",
      },
    } as unknown as Request;
    const spy = jest
      .spyOn(userServices, "handleRefreshTokenService")
      .mockResolvedValue("hjhvdvvfuhhucdihhudg");
    await handleRefreshToken(req, res);
    expect(res.json).toHaveBeenCalledWith({
      accessToken: "hjhvdvvfuhhucdihhudg",
    });
    expect(res.json).toHaveBeenCalledTimes(1);
    spy.mockRestore();
  });

  test("should throw error when token is not in cookie", async () => {
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis(),
    } as unknown as Response;
    const req = {
      body: {
        email: "piyumi@gmail.com",
        password: "Admin@123",
      },
      cookies: {
        jwt: "",
      },
    } as unknown as Request;
    const spy = jest
      .spyOn(userServices, "handleRefreshTokenService")
      .mockImplementation(() => {
        throw new Error("No token provided");
      });
    await handleRefreshToken(req, res);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.send).toHaveBeenCalledWith({
      statusCode: 401,
      message: "error",
      data: "No token provided",
    });
    expect(spy).toHaveBeenCalledTimes(1);
    spy.mockRestore();
  });
});

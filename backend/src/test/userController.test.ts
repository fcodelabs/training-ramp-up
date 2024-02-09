import { Request, Response } from "express";
import { UserController } from "../controllers/userController";
import { UserService } from "../services/userService";

jest.mock("../services/userService");

describe("UserController", () => {
  let req: Request;
  let res: Response;

  beforeEach(() => {
    req = {} as Request;
    res = {} as Response;
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
  });

  describe("createUser", () => {
    it("should create a new user", async () => {
      req.body = {
        name: "Test User",
        email: "test@example.com",
        role: "user",
      };

      (UserService.createUser as jest.Mock).mockResolvedValueOnce({
        message: "User created successfully",
      });

      await UserController.createUser(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        message: "User created successfully",
      });
    });

    it("should return error for invalid request parameters", async () => {
      req.body = {
        name: "Test User",
        email: "", // Invalid email
        role: "user",
      };

      await UserController.createUser(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: "Invalid request parameters",
      });
    });

    it("should return error when UserService.createUser returns an error", async () => {
      req.body = {
        name: "Test User",
        email: "test@example.com",
        role: "user",
      };

      jest
        .fn(UserService.createUser)
        .mockResolvedValueOnce({ error: "Email already exists" });

      await UserController.createUser(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({
        error:
          "An error occurred while creating the user" || "Email already exists",
      });
    });
  });

  describe("createPassword", () => {
    it("should create a new password", async () => {
      req.body = { password: "newPassword" };
      req.params = { token: "validToken" };

      jest
        .fn(UserService.createPassword)
        .mockResolvedValueOnce({ message: "Password created successfully" });

      await UserController.createPassword(req, res);

      console.log("85 line", res.status);
      expect(res.status).toHaveBeenCalledWith(201);
      console.log(res.statusCode);
      expect(res.json).toHaveBeenCalledWith({
        message: "Password created successfully",
      });
    });

    it("should return error for invalid token", async () => {
      req.body = { password: "newPassword" };
      req.params = { token: "invalidToken" };

      jest
        .fn(UserService.createPassword)
        .mockResolvedValueOnce({ error: "Invalid token" });

      await UserController.createPassword(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({
        error: "Invalid token" || "An error occurred",
      });
    });

    jest
      .fn(UserService.createPassword)
      .mockResolvedValueOnce({ error: "Internal Server Error" });
  });
});

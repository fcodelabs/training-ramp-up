import { Request, Response } from "express";
import { AuthController } from "../controllers/authController";
import { AuthService } from "../services/authService";

jest.mock("../services/authService");

describe("AuthController", () => {
  let req: Request;
  let res: Response;

  beforeEach(() => {
    req = {} as Request;
    res = {} as Response;
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    res.cookie = jest.fn().mockReturnValue(res);
    res.clearCookie = jest.fn().mockReturnValue(res);
  });

  describe("login", () => {
    it("should login the user", async () => {
      (req.body = {
        email: "test@example.com",
        password: "password",
      }),
        (AuthService.loginUser as jest.Mock).mockResolvedValueOnce({
          token: "testToken",
          selectedUser: {
            name: "Test User",
            email: "test@example.com",
            role: "Admin",
          },
          message: "User logged in successfully",
        });

      await AuthController.login(req, res);

      expect(res.cookie).toHaveBeenCalledWith("token", "testToken", {
        httpOnly: true,
        maxAge: 900000,
      });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "User logged in successfully",
        user: { name: "Test User", email: "test@example.com", role: "user" },
      });
    });

    it("should return error for invalid request parameters", async () => {
      req.body = {
        email: "",
        password: "password",
      };

      await AuthController.login(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: "Invalid request parameters",
      });
    });

    (AuthService.loginUser as jest.Mock).mockReturnValueOnce({
      error: "Invalid email",
    });
  });

  describe("registerUser", () => {
    it("should register a new user", async () => {
      req.body = {
        name: "Test User",
        email: "test@example.com",
        password: "password",
      };

      (AuthService.registerUser as jest.Mock).mockResolvedValueOnce({
        message: "User registered successfully",
      });

      await AuthController.registerUser(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        message: "User registered successfully",
      });
    });

    it("should return error for invalid request parameters", async () => {
      req.body = {
        name: "Test User",
        email: "",
        password: "password",
      };

      await AuthController.registerUser(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: "Invalid request parameters",
      });
    });

    it("should return error when AuthService.registerUser returns an error", async () => {
      req.body = {
        name: "Test User",
        email: "test@example.com",
        password: "password",
      };

      (AuthService.registerUser as jest.Mock).mockResolvedValueOnce({
        error: "Email already exists",
      });

      await AuthController.registerUser(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: "Email already exists" });
    });
  });

  describe("logout", () => {
    it("should logout the user", async () => {
      req.cookies = { token: "testToken" };

      await AuthController.logout(req, res);

      expect(res.clearCookie).toHaveBeenCalledWith("token");
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "User logged out successfully",
      });
    });

    it("should return error when an error occurs during logout", async () => {
      req.cookies = { token: "testToken" };

      (AuthService.logout as jest.Mock).mockRejectedValueOnce(
        "Internal Server Error",
      );

      await AuthController.logout(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        error: "An error occurred while logging out",
      });
    });
  });
});

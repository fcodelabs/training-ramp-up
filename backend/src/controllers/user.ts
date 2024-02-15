import { Request, Response } from "express";
import { UserService } from "../services/user";
import { Server } from "socket.io";
import { clearToken, createToken } from "../utility/auth";

export class UserController {
  private io: Server;

  constructor(io: Server) {
    this.io = io;
  }

  async selfRegister(req: Request, res: Response) {
    try {
      const user = await UserService.selfRegister(req.body);
      res.status(201).json(user);
      this.io.emit("user-registered", true);
    } catch (error) {
      console.error(error);
      if (error.message === "User already exists") {
        this.io.emit("user-exists", true);
      } else {
        this.io.emit("user-exists", false);
      }
      res
        .status(500)
        .json({ message: "An error occurred while self registering." });
    }
  }

  static async addPassword(req: Request, res: Response) {
    try {
      console.log(req.body.token, req.body.password);
      const user = await UserService.addPassword(
        req.body.token,
        req.body.password,
      );
      res.status(200).json(user); // 200 status code for OK
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "An error occurred while adding the password." });
    }
  }

  async login(req: Request, res: Response) {
    try {
      console.log(req.body);
      const user = await UserService.login(req.body.email, req.body.password);
      if (user) {
        this.io.emit("user-logging", true);
      } else {
        this.io.emit("user-logging", false);
      }
      if (user) {
        createToken(res, {
          userEmail: user.email,
          role: user.role,
        });
        res.status(200).json(user);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occurred while logging in." });
    }
  }

  static logout(req: Request, res: Response) {
    clearToken(res);
    res.status(200).json({ message: "User logged out." });
  }
}

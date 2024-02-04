import { Request, Response } from "express";
import { UserService } from "../services/user";
import { Server } from "socket.io";

export class UserController {
  private io: Server;

  constructor(io: Server) {
    this.io = io;
  }

  static async create(req: Request, res: Response) {
    try {
      const user = await UserService.create(req.body);
      res.status(201).json(user); // 201 status code for created
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "An error occurred while creating the user." });
    }
  }

  static async selfRegister(req: Request, res: Response) {
    try {
      const user = await UserService.selfRegister(req.body);
      res.status(201).json(user);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "An error occurred while self registering." });
    }
  }

  static async addPassword(req: Request, res: Response) {
    try {
      const user = await UserService.addPassword(
        req.params.token,
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
      const user = await UserService.login(req.body.email, req.body.password);
      if (user) {
        this.io.emit("user-logging", true);
      } else {
        this.io.emit("user-logging", false);
      }
      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occurred while logging in." });
    }
  }
}

// user.controller.ts
import { Request, Response } from "express";
import { UserService } from "../services/userService";

export class UserController {
  static async createUser(req: Request, res: Response) {
    const { name, email, role } = req.body;

    if (!name || !role || !email) {
      return res.status(400).json({ error: "Invalid request parameters" });
    }

    const result = await UserService.createUser(name, email, role);

    if (result.error) {
      return res.status(400).json({ error: result.error });
    }

    res.status(201).json({ message: result.message });
  }

  static async createPassword(req: Request, res: Response) {
    const { password } = req.body;
    const token = req.params.token;

    const result = await UserService.createPassword(password, token);

    if (result.error) {
      return res.status(401).json({ error: result.error });
    }

    res.status(200).json({ message: result.message });
  }
}

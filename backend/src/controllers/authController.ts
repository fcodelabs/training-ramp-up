import { Request, Response } from "express";
import { AuthService } from "../services/authService";

export class AuthController {
  static async create(req: Request, res: Response) {
    try {
      const user = await AuthService.create(req.body);
      res.status(201).json(user); // 201 status code for created
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "An error occurred while creating the user." });
    }
  }
}

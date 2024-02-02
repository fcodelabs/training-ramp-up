import { Request, Response } from "express";
import { UserService } from "../services/user";

export class UserController {
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
}

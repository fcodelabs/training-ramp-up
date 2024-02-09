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

    if (result) {
      if (result.error) {
        console.log(
          "result.error create user",
          result.error,
          "res.status",
          res.status,
        );
        return res.status(400).json({ error: result.error });
      }
      res.status(201).json({ message: result.message });
    }
    res
      .status(401)
      .json({ error: "An error occurred while creating the user" });
  }

  static async createPassword(req: Request, res: Response) {
    const { password } = req.body;
    const token = req.params.token;
    console.log("req.body", req.body, "token", token);
    const result = await UserService.createPassword(password, token);
    console.log("result", result);
    if (result) {
      if (result.error) {
        return res.status(400).json({ error: result.error });
      }
      res.status(200).json({ message: result.message });
    }
    return res.status(401).json({ error: "An error occurred" });
  }
}

// user.controller.ts
import { Request, Response } from "express";
import { UserService } from "../services/userService";

export class UserController {
  static async createUser(req: Request, res: Response) {
    const { name, email, role } = req.body;

    if (!name || !role || !email) {
      return res.status(400).json({ error: "Invalid request parameters" });
    }

    try {
      const result = await UserService.createUser(name, email, role);

      if (result && result.error === "Email already exists") {
        console.log("result.error create user", result.error);
        return res.status(401).json({ error: result.error });
      }

      return res.status(201).json({ message: result?.message });
    } catch (error) {
      console.error("Error creating user:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  static async createPassword(req: Request, res: Response) {
    try {
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
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "An error occurred while creating password" });
    }
  }
}

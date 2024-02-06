import { Request, Response } from "express";
import { AuthService } from "../services/authService";

export class AuthController {
  static async login(req: Request, res: Response) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Invalid request parameters" });
    }

    const result = await AuthService.loginUser(email, password);

    if (result.error) {
      return res.status(401).json({ error: result.error });
    }

    const token = result.token; // Declare the 'token' variable

    // Set the token in a cookie
    res.cookie("token", token, { httpOnly: true });

    res.status(200).json({ message: result.message });
  }

  static async registerUser(req: Request, res: Response) {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ error: "Invalid request parameters" });
    }

    const result = await AuthService.registerUser(username, email, password);

    if (result.error) {
      return res.status(400).json({ error: result.error });
    }

    res.status(201).json({ message: result.message });
  }
}

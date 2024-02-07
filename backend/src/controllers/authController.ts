import { Request, Response } from "express";
import { AuthService } from "../services/authService";

export class AuthController {
  static async login(req: Request, res: Response) {
    const { email, password } = req.body;
    console.log("req.body login", req.body);
    if (!email || !password) {
      return res.status(400).json({ error: "Invalid request parameters" });
    }

    const result = await AuthService.loginUser(email, password);

    console.log("result", result);
    if (result.error) {
      return res.status(401).json({ error: result.error });
    }

    const token = result.token; // Declare the 'token' variable

    // Set the token in a cookie
    // res.cookie("token", token, { httpOnly: true });
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 900000, // 15 minutes in milliseconds
    });

    res
      .status(200)
      .json({ message: result.message, user: result.selectedUser });
  }

  static async registerUser(req: Request, res: Response) {
    const { name, email, password } = req.body;
    console.log("req.body", req.body);
    console.log("username", name);
    if (!name || !email || !password) {
      return res.status(400).json({ error: "Invalid request parameters" });
    }

    const result = await AuthService.registerUser(name, email, password);

    if (result.error) {
      return res.status(400).json({ error: result.error });
    }

    res.status(201).json({ message: result.message });
  }

  static async logout(req: Request, res: Response) {
    console.log("logout controller");
    try {
      await AuthService.logout(req, res);
      res.status(200).json({ message: "User logged out successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "An error occurred while logging out" });
    }
  }
}

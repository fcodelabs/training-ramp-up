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

    return res.status(201).json({ message: result.message });
  }

  static async logout(req: Request, res: Response) {
    console.log("logout controller");
    try {
      console.log("hello logout");
      const result = await AuthService.logout(req, res);
      if (result === 200) {
        res.status(200).json({ message: "User logged out successfully" });
      } else {
        res.status(500).json({ error: "An error occurred while logging out" });
      }
      //res.status(200).json({ message: "User logged out successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "An error occurred while logging out" });
    }
  }

  static async verifyUser(req: Request, res: Response) {
    try {
      const result = await AuthService.verifyUser(req, res);
      if (result.status === 200) {
        res
          .status(200)
          .json({ message: "User verified successfully", user: result.user });
      } else {
        res
          .status(401)
          .json({ error: "User verification failed", user: result.user });
      }
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({
          error: "An error occurred while verifying the user",
          user: null,
        });
    }
  }
}

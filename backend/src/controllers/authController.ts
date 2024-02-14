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
    //const refreshToken = result.refreshTokenJWT; // Declare the 'refreshToken' variable

    // Set the token in a cookie
    // res.cookie("token", token, { httpOnly: true });
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 15,
      sameSite: "none",
    });

    // Set the refresh token in a cookie
    // res.cookie("refreshToken", refreshToken, {
    //   httpOnly: true,
    //   maxAge: 86400000, // 24 hours in milliseconds
    // });

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
      }
      if (result.status === 403) {
        console.log("forbidden user", result.user);
        res.status(403).json({ error: "forbidden user", user: result.user });
      }
      if (result.status === 401) {
        res.status(401).json({
          error: "User not verified successfully",
          user: null,
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: "An error occurred while verifying the user",
        user: null,
      });
    }
  }

  static async refreshToken(req: Request, res: Response) {
    try {
      console.log("refreshToken controller");
      const refreshToken = req.cookies.refreshToken;
      const result = await AuthService.refreshToken(refreshToken);
      if (result.status === 200) {
        res.cookie("token", result.token, {
          httpOnly: true,
          maxAge: 1000 * 10,
          sameSite: "none",
        });
        res.status(200).json({ message: "Token refreshed successfully" });
      }

      if (result.status === 401) {
        res.status(401).json({ error: "User not verified successfully" });
      }
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "An error occurred while refreshing the token" });
    }
  }
}

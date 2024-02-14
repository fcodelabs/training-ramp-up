import { AppDataSource } from "..";
import { User } from "../models/user";
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import { Request, Response } from "express";
import crypto from "crypto";
import dotenv from "dotenv";
//dotenv.config();
dotenv.config({ debug: true });

console.log("process.env.JWT_SECRET_KEY", process.env.JWT_NEW_SECRET_KEY);
export class AuthService {
  private static readonly SECRET_KEY = process.env.JWT_SECRET_KEY!;
  // private static readonly SECRET_KEY =
  //   "909ea6a39b4cf63377b5e5c4f8b8a76e52be06b0fc7af427ba38ce8a8c8a6458";

  //   static async registerUser(email: string, password: string) {
  //     try {
  //       const userRepo = AppDataSource.getRepository(User);
  //       const selectedUser = await userRepo.findOne({ where: { email } });

  //       if (selectedUser) {
  //         return { error: "Email already exists" };
  //       }

  //       const hashedPassword = await bcrypt.hash(password, 10);
  //       const newUser = userRepo.create({
  //         email,
  //         password: hashedPassword,
  //       });
  //       await userRepo.save(newUser);

  //       return { message: "User registered successfully" };
  //     } catch (error) {
  //       console.error(error);
  //       return { error: "An error occurred while registering the user" };
  //     }
  //   }

  static async loginUser(email: string, password: string) {
    try {
      const userRepo = AppDataSource.getRepository(User);
      const selectedUser = await userRepo.findOne({ where: { email } });
      console.log("selectedUser", selectedUser);
      if (!selectedUser) {
        return { error: "Invalid email" };
      }

      const isPasswordValid = await bcrypt.compare(
        password,
        selectedUser.password,
      );
      if (!isPasswordValid) {
        return { error: "Invalid password" };
      }

      if (!this.SECRET_KEY) {
        throw new Error("JWT secret key not found");
      }
      // Create a JWT token for authentication
      const token = jwt.sign(
        { email: selectedUser.email, role: selectedUser.role },
        this.SECRET_KEY,
        {
          expiresIn: "15min",
        },
      );
      console.log("token authservice", token);
      //const refreshToken = crypto.randomBytes(64).toString("hex");

      // const refreshTokenJWT = jwt.sign({ refreshToken }, this.SECRET_KEY, {
      //   expiresIn: "1d",
      // });

      //   // Set the token in a cookie
      //   res.cookie('token', token, { httpOnly: true });

      return {
        token,
        selectedUser,
        message: "User logged in successfully",
      };
    } catch (error) {
      console.error(error);
      return { error: "An error occurred while logging in" };
    }
  }

  static async registerUser(username: string, email: string, password: string) {
    try {
      const userRepo = AppDataSource.getRepository(User);
      const selectedUser = await userRepo.findOne({ where: { email } });

      if (selectedUser) {
        return { error: "Email already exists" };
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = userRepo.create({
        name: username,
        email,
        role: "Observer",
        password: hashedPassword,
      });
      await userRepo.save(newUser);

      return { message: "User registered successfully" };
    } catch (error) {
      console.error(error);
      return { error: "An error occurred while registering the user" };
    }
  }

  static async logout(req: Request, res: Response) {
    try {
      // Clear the token from the client's cookies
      console.log("logout service");
      console.log("req.cookies", req.cookies);
      res.clearCookie("token");
      res.clearCookie("refreshToken");

      return 200;
    } catch (error) {
      console.error(error);
      return 500;
    }
  }

  static async verifyUser(req: Request, res: Response) {
    try {
      const token = req.cookies.token;
      const refreshToken = req.cookies.refreshToken;
      if (!token && !refreshToken) {
        console.log("no token & refresh token");
        return { status: 401, user: null };
      }

      if (!token && refreshToken) {
        return { status: 403, user: null };
      }

      const decodedToken: any = jwt.verify(token, this.SECRET_KEY);
      console.log("decodedToken", decodedToken);
      return { status: 200, user: decodedToken };
    } catch (error) {
      console.error(error);
      return { status: 500, user: null };
    }
  }

  static async refreshToken(refreshToken: string) {
    try {
      console.log("refrsh token");
      const decodedRefreshToken: any = jwt.verify(
        refreshToken,
        this.SECRET_KEY,
      );
      console.log("decodedRefreshToken", decodedRefreshToken);

      // Create a JWT token for authentication
      const token = jwt.sign(
        { email: decodedRefreshToken.email, role: decodedRefreshToken.role },
        this.SECRET_KEY,
        {
          expiresIn: "10s",
        },
      );
      console.log("token", token);

      //  set the token in a cookie

      return {
        status: 200,
        token,
        message: "Refresh token verified successfully",
      };
    } catch (error) {
      console.error(error);
      return { status: 401, message: "Invalid refresh token" };
    }
  }
}

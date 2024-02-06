import { AppDataSource } from "..";
import { User } from "../models/user";
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

export class AuthService {
  private static readonly SECRET_KEY = process.env.JWT_SECRET_KEY!;

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

      // Create a JWT token for authentication
      const token = jwt.sign(
        { email: selectedUser.email, role: selectedUser.role },
        this.SECRET_KEY,
        {
          expiresIn: "1h",
        },
      );

      //   // Set the token in a cookie
      //   res.cookie('token', token, { httpOnly: true });

      return { token, message: "User logged in successfully" };
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
}

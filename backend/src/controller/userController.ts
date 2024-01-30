import { Request, Response } from "express";
import UserService from "../services/userService";
import * as jwt from "jsonwebtoken";
import { User } from "../entity/user";
import * as bcrypt from "bcrypt";
const SECRET_KEY = process.env.SECRET_KEY;

export class UserController {
  private userService = new UserService();

  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
      const user = await this.userService.findByEmail(email);

      if (!user || !(await user.comparePassword(password))) {
        return res.status(401).json({ error: "Invalid email or password" });
      }

      const token = jwt.sign({ email, role: user.role }, SECRET_KEY, {
        expiresIn: "5h",
      });

      res.status(200).json({ user, token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
  async create(req: Request, res: Response) {
    const { email, password, role } = req.body;

    try {
      const existingUser = await this.userService.findByEmail(email);
      if (existingUser) {
        res.status(400).json({ error: "Email is already in use" });
        return;
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User();
      user.email = email;
      user.password = hashedPassword;
      user.role = role;

      const createdUser = await this.userService.createUser(user);

      res.status(200).json({ messege: "User created successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

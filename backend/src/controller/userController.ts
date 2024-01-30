import { Request, Response } from "express";
import UserService, {
  generateTemporaryPassword,
} from "../services/userService";
import * as jwt from "jsonwebtoken";
import { User } from "../entity/user";
import * as nodemailer from "nodemailer";
import * as bcrypt from "bcrypt";
import { sendSignupEmail } from "../services/emailService";
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

  async email(req: Request, res: Response) {
    const { email, role, name } = req.body;

    try {
      const tempToken = jwt.sign({ email, role }, SECRET_KEY, {
        expiresIn: "5 minutes",
      });

      await this.saveTokenInUserEntity(email, role, tempToken);

      if (name && role && email) {
        await sendSignupEmail(email, role, name, tempToken);

        res.status(200).json({
          message: 'Signup link sent successfully',
          tempToken,
        });
      } else {
        res.status(400).json({ error: 'Invalid request parameters' });
      }
    
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async deleteToken(req: Request, res: Response) {
    const { email } = req.body;
    try {
      const user = await this.userService.findByEmail(email);

      if (!user) {
        return res.status(401).json({ error: "Invalid email" });
      }

      user.tempToken = null;
      await this.userService.updateUser(user);

      res.status(200).json({ message: "Token deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async create(req: Request, res: Response) {
    const { password, token } = req.body;
    try {
      const decodedToken: any = jwt.verify(token, SECRET_KEY);
      const curr_user = await this.userService.findByEmail(decodedToken.email);
      if (!curr_user || !(await curr_user.compareTempToken(token))) {
        res.status(401).json({ error: "Invalid token" });
        return;
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User();
      user.email = decodedToken.email;
      user.password = hashedPassword;
      user.tempToken = null;

      await this.userService.createUser(user);

      res.status(200).json({ message: "User created successfully" });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  private async saveTokenInUserEntity(
    email: string,
    role: string,
    token: string
  ): Promise<void> {
    let user = await this.userService.findByEmail(email);
    const hashedToken = await bcrypt.hash(token, 10);

    if (!user) {
      const newUser = new User();
      newUser.email = email;
      newUser.role = role;
      newUser.tempToken = hashedToken;

      const tempPassword = generateTemporaryPassword();
      newUser.password = await bcrypt.hash(tempPassword, 10);

      await this.userService.createUser(newUser);
    } else {
      user.tempToken = hashedToken;
      await this.userService.updateUser(user);
    }
  }
}

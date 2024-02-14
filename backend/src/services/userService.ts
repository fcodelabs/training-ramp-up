import { AppDataSource } from "..";
import { User } from "../models/user";
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import dotenv from "dotenv";
import sendEmail from "../utils/sendMail";

dotenv.config();

export class UserService {
  // private static SECRET_KEY = process.env.JWT_NEW_SECRET_KEY!;
  // private static TEMP_PASSWORD = process.env.TEMP_NEW_PASSWORD!;
  // private static passwordCreationLink = process.env.PASSWORD_CREATION_LINK!;

  private static SECRET_KEY =
    "909ea6a39b4cf63377b5e5c4f8b8a76e52be06b0fc7af427ba38ce8a8c8a6458";
  private static TEMP_PASSWORD =
    "84a16c1d2bdeb0474693e7bf00f0e167e819dca14059f61cd5b08b2e05fa2bfc";
  private static passwordCreationLink =
    "https://training-ramp-up.web.app/create-password";

  static async createUser(name: string, email: string, role: string) {
    try {
      const userRepo = AppDataSource.getRepository(User);
      const selectedUser = await userRepo.findOne({ where: { email } });

      if (selectedUser) {
        return { error: "Email already exists" };
      }

      // Generate temporary token and hashed password
      const token = jwt.sign({ email, role }, this.SECRET_KEY, {
        expiresIn: "1h",
      });
      const hashedTempPassword = await bcrypt.hash(this.TEMP_PASSWORD, 10);

      // Create new user with temporary credentials
      const newUser = userRepo.create({
        name,
        email,
        role,
        password: hashedTempPassword,
        token,
      });

      // Send email with signup link
      await sendEmail(
        newUser.name,
        newUser.email,
        newUser.role,
        this.passwordCreationLink + newUser.token,
      );
      await userRepo.save(newUser);

      return { message: "User created successfully" };
    } catch (error) {
      console.error(error);
      console.log("secret key", this.SECRET_KEY);
      return { error: "An error occurred while creating the user" };
    }
  }

  static async createPassword(password: string, token: string) {
    try {
      const decodedToken: any = jwt.verify(token, this.SECRET_KEY);
      console.log("decodedToken", decodedToken);
      const userRepo = AppDataSource.getRepository(User);
      const selectedUser = await userRepo.findOne({
        where: { email: decodedToken.email },
      });
      console.log("selectedUser", selectedUser);
      if (!selectedUser) {
        return { error: "Invalid token" };
      }

      // Update the user's password
      const hashedPassword = await bcrypt.hash(password, 10);
      selectedUser.password = hashedPassword;
      selectedUser.token = "";

      await userRepo.save(selectedUser);

      return { message: "Password created successfully" };
    } catch (error) {
      console.error(error);
      return { error: "Internal Server Error" };
    }
  }
}

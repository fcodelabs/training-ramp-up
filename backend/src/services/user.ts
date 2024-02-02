import { AppDataSource } from "..";
import { User } from "../models/user";
import { sendEmail } from "../utility/sendMail";

export class UserService {
  static async create(data: Partial<User>) {
    const repository = AppDataSource.getRepository(User);
    const token = await sendEmail(data.email);
    if (!token) {
      throw new Error("Error sending email");
    } else {
      const newUser = repository.create({
        ...data,
        passwordToken: token,
        passwordExpires: Date.now() + 3600000,
      });
      return await repository.save(newUser);
    }
  }

  static async findAll() {
    try {
      const repository = AppDataSource.getRepository(User);
      return await repository.find();
    } catch (error) {
      console.error("Error finding all users:", error);
    }
  }
}

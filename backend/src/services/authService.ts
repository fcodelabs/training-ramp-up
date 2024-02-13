import { AppDataSource } from "..";
import { User } from "../models/user";
import { sendEmail } from "../utility/sendMail";

export class AuthService {
  static async create(data: Partial<User>) {
    const repository = AppDataSource.getRepository(User);
    const token = await sendEmail(data.email, data.name);
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

  static async authCheck(email: string) {
    const repository = AppDataSource.getRepository(User);
    const user = await repository.findOne({ where: { email: email } });
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  }
}

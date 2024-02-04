import { AppDataSource } from "../config/data-source";
import { User } from "../entity/user";

export class UserService {
  private userRepository = AppDataSource.getRepository(User);

  async createUser(user: User): Promise<User> {
    try {
      return await this.userRepository.save(user);
    } catch (error) {
      throw error;
    }
  }
  async findByEmail(email: string): Promise<User | undefined> {
    return await this.userRepository.findOne({ where: { email } });
  }

  async updateUser(user: User): Promise<User> {
    return await this.userRepository.save(user);
  }
}

export function generateTemporaryPassword(): string {
  const crypto = require("crypto");
  const tempPassword = crypto.randomBytes(8).toString("hex");
  return tempPassword;
}

export default UserService;

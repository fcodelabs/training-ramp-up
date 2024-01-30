import { AppDataSource } from "../config/data-source";
import { User } from "../entity/user";

class UserService {
  private userRepository = AppDataSource.getRepository(User);

  async createUser(user: User): Promise<User> {
    try {
      return await this.userRepository.save(user);
    } catch (error) {
      if (error.code === "23505") {
        throw new Error("Email already exists");
      }
      throw error;
    }
  }
  async findByEmail(email: string): Promise<User | undefined> {
    return await this.userRepository.findOne({ where: { email } });
  }
}

export default UserService;

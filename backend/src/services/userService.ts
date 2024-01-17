// src/services/UserService.ts

import { AppDataSource } from '../data-source';
import { User } from '../entity/User';

export class UserService {
  private userRepository = AppDataSource.getRepository(User);

  async getAllUsers() {
    return this.userRepository.find();
  }

  async getUserById(id: number) {
    return this.userRepository.findOne({
      where: { id },
    });
  }

  async createUser(firstName: string, lastName: string, age: number) {
    const user = this.userRepository.create({
      firstName,
      lastName,
      age,
    });
    return this.userRepository.save(user);
  }

async removeUser(id: number) {
    const userToRemove = await this.userRepository.findOne({
        where: { id },
    });

    if (!userToRemove) {
        throw new Error('User not found');
    }

    await this.userRepository.remove(userToRemove);

    return 'User has been removed';
}
}

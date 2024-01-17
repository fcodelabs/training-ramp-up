// src/controller/UserController.ts

import { NextFunction, Request, Response } from 'express';
import { UserService } from '../services/userService';

export class UserController {
  private userService = new UserService();

  async all(request: Request, response: Response, next: NextFunction) {
    const users = await this.userService.getAllUsers();
    return users;
  }

  async one(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.params.id);
    const user = await this.userService.getUserById(id);

    if (!user) {
      return 'Unregistered user';
    }

    return user;
  }

  async save(request: Request, response: Response, next: NextFunction) {
    const { firstName, lastName, age } = request.body;
    const createdUser = await this.userService.createUser(firstName, lastName, age);

    return createdUser;
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.params.id);

    try {
      const result = await this.userService.removeUser(id);
      return result;
    } catch (error) {
      return error.message;
    }
  }
}

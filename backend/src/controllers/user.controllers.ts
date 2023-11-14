import type { Request, Response } from "express";
import { validationResult } from "express-validator";

import * as UserService from "../services/user.services";
import jwt from "jsonwebtoken";
let jwtSecretKey = process.env.JWT_ACCESS_SECRET || "";

// GET: List of all Users
export const getUsers = async (request: Request, response: Response) => {
  try {
    const users = await UserService.listUsers();
    return response.status(200).json(users);
  } catch (error: any) {
    return response.status(500).json(error.message);
  }
};

// GET: A single User by ID
export const getUser = async (request: Request, response: Response) => {
  const id: string = request.params.id;
  try {
    const user = await UserService.getUser(id);
    if (user) {
      return response.status(200).json(user);
    }
    return response.status(404).json("User could not be found");
  } catch (error: any) {
    return response.status(500).json(error.message);
  }
};

// POST: Create an User
export const createUser = async (request: Request, response: Response) => {
  const errors = validationResult(request);
  console.log(request.body);
  if (!errors.isEmpty()) {
    return response.status(400).json({ errors: errors.array() });
  }
  try {
    const user = request.body;
    const newUser = await UserService.createUser(user);
    return response.status(201).json(newUser);
  } catch (error: any) {
    return response.status(500).json(error.message);
  }
};

// PUT: Updating an User
export const updateUser = async (request: Request, response: Response) => {
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    return response.status(400).json({ errors: errors.array() });
  }
  const id: string = request.params.id;
  try {
    const user = request.body;
    const updateUser = await UserService.updateUser(user, id);
    return response.status(200).json(updateUser);
  } catch (error: any) {
    return response.status(500).json(error.message);
  }
};

// DELETE: Delete an User based on the id
export const deleteUser = async (request: Request, response: Response) => {
  const id: string = request.params.id;
  try {
    await UserService.deleteUser(id);
    return response.status(204).json("User has been successfully deleted");
  } catch (error: any) {
    return response.status(500).json(error.message);
  }
};

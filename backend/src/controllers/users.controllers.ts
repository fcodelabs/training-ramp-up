import AppDataSource from '../dataSource';
import { Users } from '../models/user';
import { type Request, type Response } from 'express';

export const createUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userRepo = AppDataSource.getRepository(Users);
    const newUser = userRepo.create(req.body as Users);
    await userRepo.save(newUser);
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'internal server error' });
  }
};

export const getAllUsers = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userRepo = AppDataSource.getRepository(Users);
    const allUsers = await userRepo.find();
    res.status(201).json(allUsers);
  } catch (error) {
    res.status(500).json({ error: 'internal server error' });
  }
};

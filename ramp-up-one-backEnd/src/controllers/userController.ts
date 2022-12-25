import { Request, Response } from 'express';
import { saveUserService, getUser } from '../services/userService';

export const saveUser = async (req: Request, res: Response) => {
  try {
    const response = await saveUserService(req.body);
    res.send(response);
  } catch (err) {
    res.send('Error' + err);
  }
};

export const loginUser = async (req: Request, res: Response) => {
  console.log(req.body);
  try {
    const response = await getUser(req.body);
    res.send(response);
  } catch (err) {
    res.send('Error' + err);
  }
};

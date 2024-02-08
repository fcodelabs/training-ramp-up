import { Request, Response } from 'express';
import * as userService from '../services/User';

export const createUser = async (req: Request, res: Response) => {
    try {

        
        const newUser = await userService.createUserService(req.body);

        return res.status(200).json(newUser);
        
    } catch (error) {
        return res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
};

export const createPassword = async (req: Request, res: Response) => {
    const { token } = req.params;
    const { password } = req.body;
  
    try {
        const result = await userService.createPasswordService({ token, password });
        return res.status(200).json(result);
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
      }
  };

export const registerUser = async (req: Request, res: Response) => {
    try {
        const newUser = await userService.registerUserService(req.body);

        return res.status(200).json(newUser);
        
    } catch (error) {
        return res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
};

export const loginUser =async (req: Request, res: Response) => {
  try {
    const user = await userService.loginUserService(req.body);

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
}

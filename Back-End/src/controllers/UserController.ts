/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response } from 'express';
import { createUserService, loginService } from '../services/userService';
import { GenerateTokens } from '../utils/generateTokens';
import jwt from 'jsonwebtoken';

export const signupUser = async (req: Request, res: Response) => {
  try {
    const user = await createUserService(req.body);
    res.status(200).json({
      success: true,
      message: 'User created successfully',
    });
  } catch (error) {
    res.status(401).send('Invalid Signup');
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const { isMatch, userFound }: any = await loginService(email, password);
    if (isMatch) {
      const { accessToken, refreshToken, userData } = await GenerateTokens(email, userFound.role);
      res.cookie('accessToken', accessToken, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60,
      });

      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 1000,
      });
      const userDetails = userData;

      res.status(200).json({
        success: true,
        message: 'Logged in sucessfully',
      });
    } else {
      alert('Invalid credentials');
    }
  } catch (err) {
    res.status(401).json({
      success: false,
      message: 'err',
    });
  }
};

export const refreshToken = async (req: Request, res: Response) => {
  try {
    const userData: any = jwt.verify(req.cookies.refreshToken, process.env.REFRESH_TOKEN_SECRET as string);

    const email = userData.email;
    const role = userData.role;

    const payload = { email, role };
    const accessToken = jwt.sign(payload, process.env.JWT_SECRET as string, {
      expiresIn: '1m',
    });

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60,
    });

    res.status(200).json({
      accessToken,
      message: 'Token refreshed',
    });
  } catch (err) {
    res.status(401).json({
      message: 'error',
    });
  }
};

export const logoutUser = async (req: Request, res: Response) => {
  try {
    res.cookie('accessToken', '', {
      maxAge: -1,
      httpOnly: true,
    });
    res.cookie('refreshToken', '', {
      maxAge: -1,
      httpOnly: true,
    });
    res.cookie('user', '', {
      maxAge: -1,
      httpOnly: false,
    });
    res.status(200).json({
      message: 'Logged out sucessfully',
    });
  } catch (err) {
    res.status(400).send(err);
  }
};

export const userDetails = async (req: Request, res: Response): Promise<void> => {
  try {
    const payload = jwt.verify(req.cookies.accessToken, process.env.JWT_SECRET as string);
    if (payload) {
      const userKey: any = process.env.USER_KEY;
      const user = jwt.sign(payload, userKey);
      res.cookie('user', user, {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: false,
      });
      console.log('user details', payload);
      res.sendStatus(200);
    } else {
      res.sendStatus(401);
    }
  } catch (err: any) {
    res.status(400).send('Error : ' + err.message);
  }
};

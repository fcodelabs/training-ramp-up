/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response } from 'express';
import { createUserService, loginService } from '../services/UserService';
import { VerfiyRefreshToken } from '../utils/VerifyRefreshToken';
import { GenerateTokens } from '../utils/GenerateTokens';
import jwt from 'jsonwebtoken';

export const signupUser = async (req: Request, res: Response) => {
  try {
    const user = await createUserService(req.body);
    res.status(200).json({
      success: true,
      message: 'User created successfully',
    });
  } catch (err) {
    if (typeof err === 'object' && err !== null) {
      res.status(400).send(err.toString());
    } else {
      res.status(400).send(err);
    }
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

      res.cookie('user', userData, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60,
      });

      res.status(200).json({
        accessToken,
        refreshToken,
        success: true,
        message: 'Logged in sucessfully',
      });
    }
  } catch (err) {
    if (typeof err === 'object' && err !== null) {
      res.status(400).json({
        success: false,
        message: err.toString(),
      });
    } else {
      res.status(400).json({
        success: false,
        message: err,
      });
    }
  }
};

export const refreshToken = async (req: Request, res: Response) => {
  try {
    // const { email, refreshToken } = req.body;
    console.log('Hello req');
    const email = await req.cookies.user.email;
    const role = await req.cookies.user.role;
    console.log('Hello email', email);
    console.log('Hello role', role);
    const refreshToken = await req.cookies.refreshToken;
    const isValid = VerfiyRefreshToken(refreshToken, email);
    if (!isValid) {
      return res.status(400).json({
        success: false,
        message: 'Invalid refresh token',
      });
    }

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
    if (typeof err === 'object' && err !== null) {
      res.status(400).send(err.toString());
    } else {
      res.status(400).json(err);
    }
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
      httpOnly: true,
    });
    res.status(200).json({
      message: 'Logged out sucessfully',
    });
  } catch (err) {
    if (typeof err === 'object' && err !== null) {
      res.status(400).send(err.toString());
    } else {
      res.status(400).send(err);
    }
  }
};

/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response } from 'express';
import { createUserService, loginService } from '../services/UserService';
import { VerfiyRefreshToken } from '../utils/VerifyRefreshToken';
import { GenerateTokens } from '../utils/GenerateTokens';
import jwt from 'jsonwebtoken';

export const signupUser = async (req: Request, res: Response) => {
  try {
    const user = await createUserService(req.body);
    res.send(user);
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
    const { email, password, role } = req.body;
    const isMatch = await loginService(email, password);
    if (isMatch) {
      const { accessToken, refreshToken } = await GenerateTokens(email, role);

      res.status(200).json({
        accessToken,
        refreshToken,
        message: 'Logged in sucessfully',
      });
    }
  } catch (err) {
    if (typeof err === 'object' && err !== null) {
      res.status(400).send(err.toString());
    } else {
      res.status(400).send(err);
    }
  }
};

export const refreshToken = async (req: Request, res: Response) => {
  try {
    const { email, refreshToken, role } = req.body;
    console.log(email, refreshToken);
    const isValid = VerfiyRefreshToken(refreshToken, email, role);
    console.log(isValid);
    if (!isValid) {
      return res.status(400).json({
        success: false,
        message: 'Invalid refresh token',
      });
    }

    const payload = { email, role };
    const accessToken = jwt.sign(payload, process.env.JWT_SECRET as string, {
      expiresIn: '40m',
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

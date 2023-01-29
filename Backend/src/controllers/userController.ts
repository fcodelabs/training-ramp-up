import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { createUser, loginUser } from './../services/userService';
import cookie from 'cookie';

interface UserType {
  id: number;
  email: string;
  password: string;
  role: string;
}

export const signUp = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) throw new Error('Email and password are required').message;
    const newUser: UserType = await createUser({ email, password });

    const jwtToken = jwt.sign({ email: newUser.email, role: newUser.role }, process.env.JWT_SECRET as string, {
      expiresIn: '15m',
    });
    const refreshToken = jwt.sign({ email: newUser.email, role: newUser.role }, process.env.JWT_SECRET as string, {
      expiresIn: '1d',
    });
    const jwtCookie = cookie.serialize('jwt', jwtToken, {
      httpOnly: true,
      secure: true,
      path: '/',
      sameSite: 'strict',
      maxAge: 3600, // expires in 1 hour
    });
    const refreshCookie = cookie.serialize('refresh', refreshToken, {
      httpOnly: true,
      secure: true,
      path: '/',
      sameSite: 'strict',
      maxAge: 86400, // expires in 1 day
    });
    res.setHeader('Set-Cookie', [jwtCookie, refreshCookie]);
    res.status(200).json({
      message: 'User created successfully',
      user: {
        email: newUser.email,
        role: newUser.role,
        id: newUser.id,
      },
    });
  } catch (err) {
    res.status(400).json({ err });
  }
};

export const signIn = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) throw new Error('Email and password are required').message;
    const user = await loginUser(email, password);
    const jwtToken = jwt.sign({ email: user.email, role: user.role }, process.env.JWT_SECRET as string, {
      expiresIn: '1h',
    });
    const refreshToken = jwt.sign({ email: user.email, role: user.role }, process.env.JWT_SECRET as string, {
      expiresIn: '1d',
    });
    const jwtCookie = cookie.serialize('jwt', jwtToken, {
      httpOnly: true,
      secure: true,
      path: '/',
      sameSite: 'strict',
      maxAge: 3600, // expires in 1 hour
    });
    const refreshCookie = cookie.serialize('refresh', refreshToken, {
      httpOnly: true,
      secure: true,
      path: '/',
      sameSite: 'strict',
      maxAge: 86400, // expires in 1 day
    });
    res.setHeader('Set-Cookie', [jwtCookie, refreshCookie]);
    res.status(200).json({
      message: 'User logged in successfully',
      user: {
        email: user.email,
        role: user.role,
        id: user.id,
      },
    });
  } catch (err) {
    res.status(400).json({ err });
  }
};

export const signOut = async (req: Request, res: Response) => {
  try {
    const jwtCookie = cookie.serialize('jwt', '', {
      httpOnly: true,
      secure: true,
      path: '/',
      sameSite: 'strict',
      maxAge: 0, // expires in 1 hour
    });
    const refreshCookie = cookie.serialize('refresh', '', {
      httpOnly: true,
      secure: true,
      path: '/',
      sameSite: 'strict',
      maxAge: 0, // expires in 1 day
    });
    res.setHeader('Set-Cookie', [jwtCookie, refreshCookie]);
    res.status(200).json({ message: 'User logged out successfully' });
  } catch (err) {
    res.status(400).json({ message: 'User not found', err });
  }
};

export const refresh = async (req: Request, res: Response) => {
  try {
    const refresh = req.cookies.refresh;
    if (!refresh) throw new Error('No refresh token found').message;
    const { email, role } = jwt.verify(refresh, process.env.JWT_SECRET as string) as { email: string; role: string };
    const jwtToken = jwt.sign({ email, role }, process.env.JWT_SECRET as string, {
      expiresIn: '1h',
    });

    const jwtCookie = cookie.serialize('jwt', jwtToken, {
      httpOnly: true,
      path: '/',
      secure: true,
      sameSite: 'strict',
      maxAge: 3600, // expires in 1 hour
    });
    const refreshCookie = cookie.serialize('refresh', refresh, {
      httpOnly: true,
      path: '/',
      secure: true,
      sameSite: 'strict',
      maxAge: 86400, // expires in 1 day
    });

    res.setHeader('Set-Cookie', [jwtCookie, refreshCookie]);
    res.status(200).json({ message: 'User refreshed successfully' });
  } catch (err) {
    res.status(400).json({ err });
  }
};

/* eslint-disable @typescript-eslint/no-confusing-void-expression */
import AppDataSource from '../dataSource';
import { Users } from '../models/user';
import { type NextFunction, type Request, type Response } from 'express';
import { sendMail, transporter } from '../sendEmails';
import * as jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import * as bcrypt from 'bcrypt';
dotenv.config();
const SECRET_KEY = process.env.JWT_SECRET_KEY!;
export const emailSend = async (req: Request, res: Response): Promise<void> => {
  const { email, role, name } = req.body;

  try {
    if (name != null && role != null && email != null) {
      const tempToken = jwt.sign({ email, role }, SECRET_KEY, {
        expiresIn: '1h'
      });

      const userRepo = AppDataSource.getRepository(Users);
      const selectedUser = await userRepo.findOne({
        where: { email }
      });

      const tempPassword = process.env.TEMP_PASSWORD!;
      const hashedTempPassword = await bcrypt.hash(tempPassword, 10);
      if (selectedUser === null) {
        const newUser = {
          name,
          email,
          role,
          password: hashedTempPassword,
          tempToken
        };

        const createdUser = userRepo.create(newUser);
        await userRepo.save(createdUser);
      } else {
        if (selectedUser != null) {
          res
            .status(404)
            .json({ error: 'email already exists', isVerified: true });
          return;
        }
        userRepo.merge(selectedUser, { tempToken });
        await userRepo.save(selectedUser);
      }

      await sendMail(
        transporter,
        email as string,
        role as string,
        name as string,
        tempToken
      );
      res.status(200).json({
        message: 'Signup link sent successfully',
        tempToken
      });
    } else {
      res.status(400).json({ error: 'Invalid request parameters' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
export const createUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { password, token } = req.body;
  // console.log(password);
  // console.log(token);
  try {
    const decodedToken: any = jwt.verify(token as string, SECRET_KEY);
    const userRepo = AppDataSource.getRepository(Users);
    const selectedUser = await userRepo.findOne({
      where: { email: decodedToken.email }
    });

    if (
      selectedUser === null ||
      (await selectedUser.compareTempToken(token as string)) === null
    ) {
      res.status(401).json({ error: 'Invalid token' });
      return;
    }
    const hashedPassword = await bcrypt.hash(password as string, 10);
    selectedUser.password = hashedPassword;
    selectedUser.tempToken = '';

    await userRepo.save(selectedUser);

    res.status(200).json({ message: 'User created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const registerUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { name, email, password } = req.body;

  try {
    const userRepo = AppDataSource.getRepository(Users);
    const selectedUser = await userRepo.findOne({
      where: { email }
    });
    if (selectedUser !== null) {
      res.status(400).json({ message: 'User already registered!' });
      return;
    }

    const hashedPassword = await bcrypt.hash(password as string, 10);

    const newUser = {
      email,
      name,
      role: 'Observer',
      password: hashedPassword,
      tempToken: ''
    };
    const createdUser = userRepo.create(newUser as Users);
    await userRepo.save(createdUser);
    res.status(200).json({ message: 'User is registered' });
  } catch (err) {
    console.error(err);
    res.status(404).json({ message: 'User is not registered' });
  }
};

export const loginUser = async (
  req: Request,
  res: Response
): Promise<string | null> => {
  const { email, password } = req.body;
  let userRole = null;
  try {
    const userRepo = AppDataSource.getRepository(Users);
    const selectedUser = await userRepo.findOne({
      where: { email }
    });

    if (
      selectedUser !== null &&
      (await bcrypt.compare(password as string, selectedUser.password))
    ) {
      const accessToken = jwt.sign(
        {
          user: {
            email: selectedUser.email,
            role: selectedUser.role
          }
        },
        SECRET_KEY,
        { expiresIn: '1hr' }
      );
      const refreshToken = jwt.sign(
        {
          user: {
            email: selectedUser.email,
            role: selectedUser.role
          }
        },
        SECRET_KEY,
        { expiresIn: '7d' }
      );

      if (req.cookies.accessToken !== null) {
        req.cookies.accessToken = '';
      }
      if (req.cookies.refreshToken !== null) {
        req.cookies.refreshToken = '';
      }

      res
        .cookie('accessToken', accessToken, {
          path: '/',
          expires: new Date(Date.now() + 1000 * 60),
          httpOnly: true,
          sameSite: 'lax'
        })
        .cookie('refreshToken', refreshToken, {
          path: '/',
          expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
          httpOnly: true,
          sameSite: 'lax'
        })
        .status(200)
        .json({ message: 'Login Successfully.' });
      userRole = selectedUser.role;
    } else {
      res.status(401).json({ error: 'Authentication Failed' });
    }
  } catch {
    res.status(500).json({ error: 'Internal Server Error' });
  }

  return userRole;
};

export const getAllUsers = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userRepo = AppDataSource.getRepository(Users);
    const users = await userRepo.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const logoutUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    res
      .clearCookie('accessToken', {
        httpOnly: true
      })
      .clearCookie('refreshToken', {
        httpOnly: true
      })
      .status(200)
      .json({ message: 'User logged out successfully' });
    console.log('logout');
  } catch (error) {
    res.status(500).json({ message: 'Internal  Server Error' });
  }
};

export const veryfyUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const token = req.cookies.accessToken as string;

    if (token === null || token === undefined) {
      res.status(401).json({ message: 'User is  not verified' });
      return;
    }

    const decoded = jwt.verify(token, SECRET_KEY, (error, data) => {
      if (error !== null) {
        res.status(401).json({ message: 'Token is not valid' });
        return;
      }
      if ((data as jwt.JwtPayload).user.role !== undefined) {
        req.body.role = (data as jwt.JwtPayload).user.role;
        res.status(200).json({
          message: 'User is verified',
          role: (data as jwt.JwtPayload).user.role
        });
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Internel server Error' });
  }
};

export const refreshToken = async (
  req: Request,
  res: Response
): Promise<void> => {
  const refreshToken = req.cookies.refreshToken as string;

  if (refreshToken === null) {
    res.status(401).json({ message: 'User is  not verified' });
    return;
  }

  const decode = jwt.verify(refreshToken, SECRET_KEY, (err, data) => {
    if (err !== null) {
      res.status(403).json({ error: 'Invalid token.' });
      return;
    }

    const accessToken = jwt.sign(
      {
        user: {
          email: (data as jwt.JwtPayload).user.email,
          role: (data as jwt.JwtPayload).user.role
        }
      },
      SECRET_KEY,
      {
        expiresIn: '1h'
      }
    );
    res
      .cookie('accessToken', accessToken, {
        path: '/',
        expires: new Date(Date.now() + 1000 * 60),
        httpOnly: true,
        sameSite: 'lax'
      })
      .status(200)
      .json({ message: 'Token refreshed successfully' });
  });
};

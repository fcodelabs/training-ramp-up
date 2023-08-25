import { Request, RequestHandler, Response } from 'express';
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUser,
  getUserByOne,
  updateUser,
} from '../services/user.service';
import jwt = require('jsonwebtoken');
import { jwtConfig } from '../configs/jwt.config';

export const requestGetAllUsers: RequestHandler = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const users = await getAllUsers();
    return res
      .status(200)
      .json({ data: users, message: 'User found successfully' });
  } catch (error: any) {
    if (error.message === 'User not found') {
      return res.status(400).json({ message: 'User not found' });
    } else {
      return res.status(500).json({ message: 'An error occurred' });
    }
  }
};

export const requestUsersByOne: RequestHandler = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const { search } = req.params;
    const user = await getUserByOne(search);
    return res
      .status(200)
      .json({ data: user, message: 'User found successfully' });
  } catch (error: any) {
    if (error.message === 'No user found') {
      return res.status(400).json({ message: 'User not found' });
    } else {
      return res.status(500).json({ message: 'An error occurred' });
    }
  }
};

export const requestCreateUser: RequestHandler = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const userData = req.body;
  try {
    const newUser = await createUser(userData);
    res.status(200).json({
      message: 'User created successfully',
      data: newUser,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error });
  }
};

export const requestUpdateUser: RequestHandler = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { id } = req.params;
  const userData = req.body;
  try {
    const updatedUser = await updateUser(id, userData);

    res.status(200).json({
      message: 'User updated successfully',
      data: updatedUser,
    });
  } catch (error: any) {
    if (error.message === 'User not found') {
      res.status(400).json({ message: 'User not found' });
    } else {
      res.status(500).json({ message: 'An error occurred' });
    }
  }
};

export const requestDeleteUser: RequestHandler = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const { id } = req.params;
  try {
    const deletedUser = await deleteUser(id);

    return res.status(200).json({
      message: 'User deleted successfully',
      data: deletedUser,
    });
  } catch (error: any) {
    if (error.message === 'User not found') {
      return res.status(400).json({ message: 'User not found' });
    } else {
      return res.status(500).json({ message: 'An error occurred' });
    }
  }
};

export const signIn: RequestHandler = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const user = await getUser(req.body.email, req.body.password);
    if (user) {
      const accessToken = jwt.sign(
        { email: user.email, roleType: user.roleType },
        jwtConfig.secretKey,
        { expiresIn: jwtConfig.expiresIn },
      );
      const refreshToken = jwt.sign(
        { email: user.email, roleType: user.roleType },
        jwtConfig.refreshKey,
        { expiresIn: '24h' },
      );
      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
      });
      res.cookie('accessToken', accessToken, {
        httpOnly: true,
      });

      res.status(200).json({ accessToken, refreshToken });
    } else {
      res.status(401).json({ message: 'Unauthorized' });
    }
  } catch (error) {
    console.log(error);

    res.status(500).json(error);
  }
};

export const generateNewAccessToken: RequestHandler = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const refreshToken = req.cookies.refreshToken;
    const user = req.cookies.user;
    if (!refreshToken) {
      res.status(403).json({ message: 'Forbidden' });
    } else {
      const payload = jwt.verify(refreshToken, jwtConfig.refreshKey);
      if (payload) {
        const accessToken = jwt.sign(
          { email: user.email, roleType: user.roleType },
          jwtConfig.secretKey,
          { expiresIn: jwtConfig.expiresIn },
        );
        res.cookie('accessToken', accessToken, {
          httpOnly: true,
        });
        res.status(200).json({ accessToken });
      }
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

export const signOut: RequestHandler = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    res.status(200).json({ message: 'Sign out successfully' });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getDetails = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const payload = jwt.verify(req.cookies.accessToken, jwtConfig.secretKey);
    if (payload) {
      const user = jwt.sign(payload, jwtConfig.userKey, {
        expiresIn: jwtConfig.expiresIn,
      });
      res.cookie('user', user, {
        httpOnly: true,
      });
      res.status(200).json({ user });
    } else {
      res.status(401).json({ message: 'Unauthorized' });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

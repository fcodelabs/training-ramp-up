import { Request, Response } from 'express';
import {
  saveUserService,
  getUser,
  refreshService,
} from '../services/userService';

export const saveUser = async (req: Request, res: Response) => {
  try {
    const response = await saveUserService(req.body);

    if (response) {
      res.cookie('accessToken', response.newAccessToken, {
        maxAge: 300000,
        httpOnly: true,
      });
      res.cookie('refreshToken', response.newRefreshToken, {
        maxAge: 3.154e10,
        httpOnly: true,
      });
    }

    res.send({ message: 'signin successfully' });
  } catch (err) {
    res.send('Error' + err);
  }
};

export const loginUser = async (req: Request, res: Response) => {
  console.log(req.body);
  try {
    const response: any = await getUser(req.body);
    if (response) {
      res.cookie('accessToken', response.newAccessToken, {
        maxAge: 60 * 60 ,
        httpOnly: true,
      });
      res.cookie('refreshToken', response.newRefreshToken, {
        maxAge: 60 * 60 * 24 * 1000,
        httpOnly: true,
      });
    }
    res.send(response);
  } catch (err) {
    res.send('Error' + err);
  }
};

export const refresh = async (req: Request, res: Response) => {
  console.log('ctr refresh -', req.cookies);

  try {
    const refToken = req.cookies.refreshToken;

    const userToken = await refreshService(refToken);
    if (userToken) {
      res.cookie('accessToken', userToken.newAccessToken, {
        maxAge: 60 * 60 ,
        httpOnly: true,
      });

      res.status(200);
      res.send(userToken);
    }
  } catch (err) {
    res.status(400);
  }
};

export const logout = async (req: Request, res: Response) => {
  console.log(req.body);
  try {
    res.cookie('accessToken', '', {
      maxAge: -1,
      httpOnly: true,
    });
    res.cookie('refreshToken', '', {
      maxAge: -1,
      httpOnly: true,
    });
    res.status(200).json({
      status: 'Successfully logged out',
    });
  } catch (err) {
    res.send('Error' + err);
  }
};
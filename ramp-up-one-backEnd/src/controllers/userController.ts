import { Request, Response } from 'express';
import { readSync } from 'fs';
import {
  saveUserService,
  getUser,
  refreshService,
  getUserDetails,
} from '../services/userService';
import { UserModel } from '../utils/interfaces';

export const saveUser = async (req: Request, res: Response) => {
  try {
    const response = await saveUserService(req.body);
    if (response) {
      res.cookie('accessToken', response.newAccessToken, {
        maxAge: 60 * 60,
        httpOnly: true,
      });
      res.cookie('refreshToken', response.newRefreshToken, {
        maxAge: 60 * 60 * 24 * 1000,
        httpOnly: true,
      });
    }
    response !== false ? res.json(true) : res.json(false);
  } catch (err) {
    res.send('Error' + err);
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const response: any = await getUser(req.body);
    console.log('response-', response);
    if (response) {
      res.cookie('accessToken', response.newAccessToken, {
        maxAge: 60 * 60,
        httpOnly: true, 
      });
      res.cookie('refreshToken', response.newRefreshToken, {
        maxAge: 60 * 60 * 24 * 1000,
        httpOnly: true,
      });
      res.status(200);

      //res.sendStatus(200);
    }

    response !== false ? res.json(true) : res.json(false);
  } catch (err) {
    res.send('Error' + err);
  }
};

export const refresh = async (req: Request, res: Response) => {
  console.log('alert 2');
  try {
    const refToken = req.cookies.refreshToken;
    const userToken = await refreshService(refToken);
    if (userToken) {
      res.cookie('accessToken', userToken.newAccessToken, {
        maxAge: 60 * 60,
        httpOnly: true,
      });

      //  res.sendStatus(200);
      // res.send(userToken);
      res.send(true);
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
    res.cookie('userData', '', {
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

export const userDetail = async (req: Request, res: Response) => {
  console.log('user detail req.');
  try {
    const userAccToken = req.cookies.accessToken;
    const response = await getUserDetails(userAccToken);
    if (response) {
      res.cookie('userData', response.userData, {
        maxAge: 60 * 60 * 24 * 1000,
      });
      //res.send(response);
      res.sendStatus(200);
      //res.send(true);
    } else {
      res.status(550);
    }
    // res.send(false);
  } catch (err) {
    res.status(400);
  }
};

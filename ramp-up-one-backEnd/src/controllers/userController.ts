import { Request, Response } from 'express';
import { readSync } from 'fs';
import jwt from 'jsonwebtoken';
import {
  saveUserService,
  getUser,
  refreshService,
  getUserDetails,
} from '../services/userService'; 
import { config }from '../utils/config';
import { UserModel } from '../utils/interfaces';

export const saveUser = async (req: Request, res: Response) => {
  try {
    const response:any = await saveUserService(req.body);
    if (response) {
      const dataStoredInToken = {
        email: response.email,
        name: response.name,
        userRoll: response.userRoll,
      };

      const newAccessToken = jwt.sign(
        dataStoredInToken,
        config.jwt_secret_key,
        {
          expiresIn: 60 * 60,
        }
      );

      const newRefreshToken = jwt.sign(
        dataStoredInToken,
        config.jwt_secretRe_key,
        {
          expiresIn: 60 * 60 * 24 * 1000,
        }
      );

      res.cookie('accessToken', newAccessToken, {
        maxAge: 60 * 60,
        httpOnly: true,
      });
      res.cookie('refreshToken', newRefreshToken, {
        maxAge: 60 * 60 * 24 * 1000,
        httpOnly: true,
      });
    }
   response !== null ? res.json(true) : res.json(false);
  } catch (err) {
    // res.send('Error' + err);
     res.status(201);
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const response: any = await getUser(req.body);
    console.log('response-', response);
    if (response) {

      const dataStoredInToken = {
          email: response.email,
          userRoll: response.userRoll,
        };

       const newAccessToken= jwt.sign(dataStoredInToken, config.jwt_secret_key, {
          expiresIn: 60 * 60,
        })

        const newRefreshToken= jwt.sign(dataStoredInToken,config.jwt_secretRe_key,{
            expiresIn: 60 * 60 * 24 * 1000,
          }
        )

      res.cookie('accessToken', newAccessToken, {
        maxAge: 60 * 60,
        httpOnly: true,
      });
      res.cookie('refreshToken', newRefreshToken, {
        maxAge: 60 * 60 * 24 * 1000,
        httpOnly: true,
      });
    }
    
    response !== false ? res.json(true) : res.json(false);
  } catch (err) {
   // res.send('Error' + err);
   res.status(201);
  }
};

export const refresh = async (req: Request, res: Response) => {
  try {
     const secret = config.jwt_secret_key;
    const refToken = req.cookies.refreshToken;
    const userToken:any = await refreshService(refToken);
 const dataStoredInToken = {
   email: userToken.email,
   userRoll: userToken.userRoll,
 };

    const newAccessToken = jwt.sign(dataStoredInToken, secret, {
      expiresIn: 60 * 60,
    });
   
      res.cookie('accessToken', newAccessToken, {
        maxAge: 60 * 60,
        httpOnly: true,
      });
      res.send(true);
    
  } catch (err) {
    res.status(401);
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
      message: 'Successfully logged out',
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

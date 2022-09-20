import { NextFunction , Request, Response } from 'express';
import { verifyJWT } from '../util/jwt';
import { Session } from '../models';
import AppDataSource from "../util/db";
import jwt from 'jsonwebtoken';

export async function deserializeUser(req: Request, res: Response, next: NextFunction){
    const { accessToken, refreshToken } = req.cookies;
    const sessionRepository = AppDataSource.getRepository(Session)
    
    //not authorized
    if(!accessToken){
        return next();
    }
    
    //verify access token if its still valid  
    const { payload, expired } = verifyJWT( accessToken );
    console.log(payload)
    //For a valid access token
    if(payload){
        req.user = payload;
        return next();
    }
    
    //expired but valid access token
    const { payload: refresh } = expired && refreshToken ? verifyJWT(refreshToken): {payload:null};
    if(!refresh){
        return next();
    }
    
    const session = await sessionRepository.findOneBy({email:refresh.email});
    if(!session){
        return next();
    }
    
    const {iat,exp,...rest} = refresh 
    const newAccessToken = jwt.sign(rest,"NavyPenguinMariachi",{expiresIn:'5s'});
    
    res.cookie("accessToken",newAccessToken,{
        maxAge:3.154e10,
        httpOnly:true,
    })
    console.log("new access token created through refresh token!");
    req.user = verifyJWT(newAccessToken).payload;
    return next();
}
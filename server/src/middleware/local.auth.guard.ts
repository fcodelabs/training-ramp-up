import { NextFunction , Request, Response } from 'express';
import { verifyJWT } from '../util/jwt';
import { Session } from '../models';
import AppDataSource from "../util/db";
import jwt from 'jsonwebtoken';
import {config} from '../util/config';

export async function LocalAuthGuard(req: Request, res: Response, next: NextFunction){
    const { accessToken, refreshToken } = req.cookies;
    const sessionRepository = AppDataSource.getRepository(Session)
    //not authorized
    if(!accessToken && !refreshToken){
        res.cookie('userData','',{
            maxAge:0,
        });
        return next();
    }

    //verify access token if its still valid  
    const { payload, expired } = accessToken? verifyJWT( accessToken ):{payload:null,expired:true};
    //For a valid access token
    if(payload){
        console.log("proceeding with the existing access token!");
        req.user = payload;
        const {iat,exp,id,...rest} = payload 
        res.cookie('userData',rest,{
            maxAge:300000,
        })
        return next();
    }
   
    
    //expired but valid access token
    const { payload: refresh } = expired && refreshToken ? verifyJWT(refreshToken): {payload:null};
    if(!refresh){
        res.cookie('userData','',{
            maxAge:0,
        });
        res.cookie('refreshToken','',{
            maxAge:0,
        });
        res.cookie('accessToken','',{
            maxAge:0,
        });
        return next();
    }

    const session = await sessionRepository.findOneBy({id:refresh.sessionId});
    if(!session){
        res.cookie('userData','',{
            maxAge:0,
        });
        res.cookie('refreshToken','',{
            maxAge:0,
        });
        res.cookie('accessToken','',{
            maxAge:0,
        });
        return next();
    }
    
    const {iat,exp,userId,...rest} = refresh;
    const tokenData  = {userId,...rest};
    const newAccessToken = jwt.sign(tokenData,config.jwt_secret,{expiresIn:'5s'});
    
    res.cookie('userData',rest,{
        maxAge:300000,
    })

    res.cookie("accessToken",newAccessToken,{
        maxAge:300000,
        httpOnly:true,
    });
    console.log("proceeding with a new access token!");
    req.user = verifyJWT(newAccessToken).payload;
    return next();
}


import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import {NextFunction, Request, Response} from "express";
dotenv.config();

export default function auth(req:Request,res:Response,next:NextFunction){

    if(req.cookies['accessToken'] && req.cookies['accessToken'].startsWith("bearer")){
        const token = req.cookies['accessToken'].split(" ")[1];
        if(token===null){
            res.sendStatus(401);
        }
        // @ts-ignore
        jwt.verify(token,process.env.TOKEN_KEY,(err,decodedVal)=>{
            if(err) {
                res.sendStatus(403);
            }else{
                // @ts-ignore
                req.decoded = decodedVal;
                next();
            }
        })

    }else{
        res.sendStatus(401);
    }
}
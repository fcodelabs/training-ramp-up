import {User} from '../models/user'
import jwt from 'jsonwebtoken'
import {refreshTokens} from "../utils/refreshTokens";
import {NextFunction, Request, Response} from "express";
import {checkCredentials, create, deleteRefreshToken} from "../services/userServices";
import dotenv from 'dotenv';
dotenv.config();


export async function createUser(req:Request,res:Response,next:NextFunction){
    try{
        const {email, firstName, lastName, password, admin} = req.body;
        let user = new User();
        user = {...user, email, firstName, lastName, password, admin};
        await create(user);
        res.status(200).json(user);
    }catch (error) {
        next(error);
    }
}

export const authonticate=async (req:Request,res:Response,next:NextFunction)=>{
    try {
        const {email,password} = req.body;
        const response = await(checkCredentials(email,password));
        const {token,refreshToken} = response;
        res.cookie(
            'tokens',
            {token,refreshToken},
            {
                httpOnly:true,
                sameSite:'strict',
                secure:true,
                maxAge:24*60*60*1000
            }
        ).status(200).json(response);
    }catch (error){
        next(error)
    }
}

export const signOut = (req:Request,res:Response,next:NextFunction)=>{
    try{
        const {refreshToken} = req.body;
        deleteRefreshToken(refreshToken);
        res.clearCookie('tokens').sendStatus(204);
    }catch (error){
        next(error);
    }
}
type Decoded = {
    email:string;
    iat:number;
    exp:number;

}
export const updateToken=(req:Request,res:Response,next:NextFunction)=>{
    try{
        const refreshToken = req.body.refreshToken;
        if (refreshToken === null) res.sendStatus(401);
        if (!refreshTokens.includes(refreshToken)) {
            res.sendStatus(403);
        } else {

            // @ts-ignore
            jwt.verify(refreshToken, process.env.REFRESH_TOKEN_KEY, (err, decoded: Decoded) => {
                if (err) {
                    res.sendStatus(403);
                } else {
                    // @ts-ignore
                    const accessToken = jwt.sign({email: decoded.email}, process.env.Token_KEY, {expiresIn: '300s'});
                    res.send({accessToken, refreshToken});
                }
            });
        }
    }catch (error){
        next(error);
    }
}
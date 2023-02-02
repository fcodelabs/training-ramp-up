import {User} from '../models/user'
import jwt from 'jsonwebtoken'
import {refreshTokens} from "../utils/refreshTokens";
import {NextFunction, Request, Response} from "express";
import {checkCredentials, checkRefreshTokenAvailability, create, deleteRefreshToken} from "../services/userServices";
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

export const authenticate=async (req:Request, res:Response, next:NextFunction)=>{
    try {
        const {email,password} = req.body;
        const response = await(checkCredentials(email,password));
        const {refreshToken} = response;
        res.cookie(
            'refreshToken',
            {refreshToken},
            {
                httpOnly:true,
                secure:true,
                sameSite:'strict',
                maxAge:24*60*60*1000
            }
        ).status(200).json(response);
        // console.log(req.headers.cookie);
    }catch (error){
        next(error)
    }
}

export const signOut = async (req:Request,res:Response,next:NextFunction)=>{
    try{
        const {email,refreshToken} = req.body;
        await deleteRefreshToken(email,refreshToken);
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
        if (!checkRefreshTokenAvailability(refreshToken)) {
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
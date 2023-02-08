import {User} from '../models/user'
import jwt from 'jsonwebtoken'
import {NextFunction, Request, Response} from "express";
import {checkCredentials, create, generateTokens} from "../services/userServices";
import dotenv from 'dotenv';

dotenv.config();

export async function createUser(req: Request, res: Response, next: NextFunction) {

    try {
        const {email, firstName, lastName, password, admin} = req.body;
        let user = new User();
        user = {...user, email, firstName, lastName, password, admin};
        const {token, refreshToken} = generateTokens(email);
        const response = await create(user);

        res.cookie(
            'refreshToken',
            refreshToken,
            {
                httpOnly: true,
                secure: true,
                sameSite: 'strict',
                maxAge: 24 * 60 * 60 * 1000
            }).cookie(
            'accessToken',
            `bearer ${token}`,
            {
                httpOnly: true,
                secure: true,
                sameSite: 'strict',
                maxAge: 5 * 60 * 1000
            }).status(200).json(response);
    } catch (error) {
        next(error);
    }
}

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {email, password} = req.body;
        const response = await (checkCredentials(email, password));
        const {authorized} = response;
        if (authorized) {
            const {token, refreshToken} = generateTokens(email);
            res.cookie(
                'refreshToken',
                refreshToken,
                {
                    httpOnly: true,
                    secure: true,
                    sameSite: 'strict',
                    maxAge: 24 * 60 * 60 * 1000
                }).cookie(
                'accessToken',
                `bearer ${token}`,
                {
                    httpOnly: true,
                    secure: true,
                    sameSite: 'strict',
                    maxAge: 5 * 60 * 1000
                }).status(200).json(response);
        } else {
            res.status(200).json(response);
        }
    } catch (error) {
        next(error)
    }
}

export const signOut = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.clearCookie('refreshToken')
            .clearCookie('accessToken').sendStatus(204)
    } catch (error) {
        next(error);
    }
}
type Decoded = {
    email: string;
    iat: number;
    exp: number;

}
export const updateToken = (req: Request, res: Response, next: NextFunction) => {
    try {
        const {refreshToken} = req.cookies
        if (!refreshToken) res.sendStatus(401);
        else {
            // @ts-ignore
            jwt.verify(refreshToken, process.env.REFRESH_TOKEN_KEY, (err, decoded: Decoded) => {
                if (err) {
                    res.sendStatus(401);
                } else {
                    // @ts-ignore
                    const accessToken = jwt.sign({email: decoded.email}, process.env.Token_KEY, {expiresIn: '300s'});
                    res.cookie(
                        'accessToken',
                        `bearer ${accessToken}`,
                        {
                            httpOnly: true,
                            secure: true,
                            sameSite: 'strict',
                            maxAge: 5 * 60 * 1000
                        }).sendStatus(200);
                }
            });
        }

    } catch (error) {
        next(error);
    }
}
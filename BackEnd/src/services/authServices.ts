import { Request, Response, NextFunction } from 'express';
import { PostgresDataSource } from '../configs/db';
const bcrypt = require('bcrypt');
import { User } from '../models/UserModel';
const jwt = require('jsonwebtoken');
require('dotenv').config();

export async function signUpUser(value: User, next: NextFunction) {
    try{
        const email = value.email
        const userRepository = PostgresDataSource.getRepository(User)
        const existingUser = await userRepository.findOneBy({
            email: email
        })
        if(!existingUser){
            const hashedPassword = await bcrypt.hash(value.password, 10);
            const newUser = new User()
            newUser.email = value.email
            newUser.password = hashedPassword
            newUser.role = 'student'
            
            return await PostgresDataSource.manager.save(newUser)
        }else{
            return null
        }
    } catch (err) {
        next(err)
    }
}

export async function signInUserService(req: Request, res: Response, next: NextFunction){
    try{
        const email = req.body.email
        const password = req.body.password
        const userRepository = PostgresDataSource.getRepository(User)
        const loggedUser = await userRepository.findOneBy({
            email: email
        })
        if(loggedUser){
            if(await bcrypt.compare(password, loggedUser.password)){
                return loggedUser.role             
            }else{
                return res.status(401).send('Password is incorrect!')
             } 
        }else{
            return res.status(400).send('Email does not exists!')
        }
    } catch(err) {
        next(err)
    }
}


export const handleRefreshTokenService = async (cookies: any) => {
    if (!cookies.jwt) throw new Error('No token provided');
  
    const refreshToken = cookies.jwt;
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET) as any;
    const accessToken = jwt.sign({ email: decoded.email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30s' });
    
    return accessToken;
  };


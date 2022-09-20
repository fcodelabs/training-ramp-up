import { User, Session } from "../models";
import AppDataSource from "../util/db";
import * as argon from 'argon2';
import jwt from 'jsonwebtoken';
import { config } from "../util/config";

export async function signupUser(data:any){
    try{
        const hash = await argon.hash(data.password);
        const user = new User()
        user.name=data.name;
        user.email = data.email;
        user.password = hash;
        
        const userRepository = AppDataSource.getRepository(User);
        const sessionRepository = AppDataSource.getRepository(Session);
        const newUser = await userRepository.save(user);
        
        if(!newUser){
            return {message:"Faild to register user !"};
        }
        const {password,id,...rest} = newUser;
        const newSession = await sessionRepository.save({email:rest.email,name:rest.name,valid:true});
        const tokenData = {userId:id,sessionId:newSession.id,...rest};
        const accessToken =  jwt.sign(tokenData,config.jwt_secret,{expiresIn:'5s'});
        const refreshToken =  jwt.sign(tokenData,config.jwt_secret,{expiresIn:'1y'});
        const userData = {sessionId:newSession.id,email:newSession.email,name:newSession.name,role:user.role};
        return {message:"Sign Up Successfull!",userData,refreshToken,accessToken};
    }catch(error){
        return {error}
    }
}

export async function signinUser(data:any){
    try{
        const userRepository = AppDataSource.getRepository(User);
        const sessionRepository = AppDataSource.getRepository(Session);
        const user = await userRepository.findOneBy({email:data.email});
        
        if(!user){
            return {message:"User not found!"};
        }
        const pwMatches = await argon.verify(user.password,data.password);
        if(!pwMatches){
            return {message:"Incorrect Credentials!"};
        }
        const {password,id,...rest} = user;
        const newSession = await sessionRepository.save({email:rest.email,name:rest.name,valid:true});
        const tokenData = {userId:id,sessionId:newSession.id,...rest};
        const accessToken =  jwt.sign(tokenData,config.jwt_secret,{expiresIn:'5s'});
        const refreshToken =  jwt.sign(tokenData,config.jwt_secret,{expiresIn:'1y'});
        const userData = {sessionId:newSession.id,email:newSession.email,name:newSession.name,role:user.role};
        
        return {message:"Login Successfull!",userData,refreshToken,accessToken};
    }catch(error){
        return {error}
    }
}

export async function signoutUser(data:any){
    try{
        const sessionRepository = AppDataSource.getRepository(Session);
        const session = await sessionRepository.findOneBy({email:data.email});
        if(!session){
            return {message:"Student doesn't exist !"};
        }
        const invalidSession = await sessionRepository.remove(session);
        return {session:invalidSession}
    }catch(error){
        return {error}
    }
}

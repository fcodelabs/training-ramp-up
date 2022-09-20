import { User, Session } from "../models";
import AppDataSource from "../util/db";
import * as argon from 'argon2';
import jwt from 'jsonwebtoken';


export async function signupUser(data:any){
    try{
        const hash = await argon.hash(data.password);
        const user = new User()
        user.name=data.name;
        user.email = data.email;
        user.password = hash;
        
        const userRepository = AppDataSource.getRepository(User);
        
        const newUser = await userRepository.save(user);
        
        if(!newUser){
            return {message:"Faild to register user !"};
        }
        const {password,...rest} = newUser; 
        return {message:"User registered successfully !",data:rest};
    }catch(error){
        return {error}
    }
}

export async function signinUser(data:any){
    try{
        const userRepository = AppDataSource.getRepository(User);
        const sessionRepository = AppDataSource.getRepository(Session);
        console.log(data);
        const user = await userRepository.findOneBy({email:data.email});
        
        if(!user){
            return {message:"User not found!"};
        }
        const pwMatches = await argon.verify(user.password,data.password);
        if(!pwMatches){
            return {message:"Incorrect Credentials!"};
        }
        const {password,...rest} = user;
        const accessToken =  jwt.sign(rest,"NavyPenguinMariachi",{expiresIn:'5s'});
        const refreshToken =  jwt.sign(rest,"NavyPenguinMariachi",{expiresIn:'1y'});
        const newSession = await sessionRepository.save({email:rest.email,name:rest.name});
        const userData = {email:newSession.email,name:newSession.name,role:user.role};
        return {message:"Login Successfull!",session:userData,refreshToken,accessToken};
    }catch(error){
        return {error}
    }
}

export async function signoutUser(data:any){
    try{
        const sessionRepository = AppDataSource.getRepository(Session);
        const session = sessionRepository.findOneBy({email:data.email});
        const invalidSession = sessionRepository.save({...session,valid:false});

        return {session:invalidSession}
    }catch(error){
        return {error}
    }
}
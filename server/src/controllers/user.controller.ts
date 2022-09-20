import {Response,Request} from "express";
import { signinUser, signoutUser, signupUser} from "../services";

export async function registerUser( req: Request , res: Response ){
    const result = await signupUser(req.body);
    if(result.error){
        res.status(400).json({message:"Failed to add student!",error:result.error});
        return;
    }
    res.status(200).json({message:"Student has been added successfully!",user:result.data});
}

export async function loginUser( req: Request , res: Response ){
    const result = await signinUser(req.body);
    if(result.error){
        res.status(400).json({message:"Login Failed!",error:result.error});
        return ;
    }
    res.cookie('accessToken',result.accessToken,{
        maxAge:3.154e10,
        httpOnly:true,
    });
    res.cookie('refreshToken',result.refreshToken,{
        maxAge:3.154e10,
        httpOnly:true,
    });
    return res.status(200).send({message:result.message, session:result.session})
}

export async function logoutUser(req: Request, res: Response){
    
    const result = await signoutUser(req.body);
    if(result.error){
        res.status(400).json({message:"Login Failed!",error:result.error});
        return;
    }
    res.cookie("accessToken","",{
        maxAge:0,
        httpOnly:true
    });
    
    res.cookie("refreshToken","",{
        maxAge:0,
        httpOnly:true
    });
    return res.status(200).send({message:"Successfully logged out!",session:result.session});
}
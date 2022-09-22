import {Response,Request} from "express";
import { signinUser, signoutUser, signupUser} from "../services";

export async function registerUser( req: Request , res: Response ){
    const result = await signupUser(req.body);
    if(result.error){
        res.status(400).json({message:"Signup Failed",error:result.error});
        return;
    }
    res.cookie('accessToken',result.accessToken,{
        maxAge:300000,
        httpOnly:true,
    });
    res.cookie('refreshToken',result.refreshToken,{
        maxAge:3.154e10,
        httpOnly:true,
    });
    res.cookie('userData',result.userData,{
        maxAge:300000,
    });
    console.log();
    return res.status(200).send({message:result.message})
}

export async function loginUser( req: Request , res: Response ){
    const result = await signinUser(req.body);
    if(result.error){
        res.status(400).json({message:"Login Failed!",error:result.error});
        return ;
    }
    res.cookie('accessToken',result.accessToken,{
        maxAge:300000,
        httpOnly:true,
    });
    res.cookie('refreshToken',result.refreshToken,{
        maxAge:3.154e10,
        httpOnly:true,
    });
    res.cookie('userData',result.userData,{
        maxAge:300000,
    })
    return res.status(200).send({message:result.message});
}

export async function logoutUser(req: Request, res: Response){
    let sessionId:string = req.params.sessionId;
    const result = await signoutUser(sessionId);
    if(result.error){
        res.status(400).json({message:"Log out Failed!",error:result.error});
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

    res.cookie("userData","",{
        maxAge:0,
    });
    return res.status(200).send({message:"Successfully logged out!"});
}

export async function loginStatus(req: Request, res: Response){
    return res.status(200).send(req.user);
}
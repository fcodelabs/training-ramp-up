import express, { Request, Response } from 'express'
import {checkCredentials, createUser} from '../controllers/userController'
import {User} from "../models/user";
import {refreshTokens} from "../utils/refreshTokens";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();
const userRouter: express.Router = express.Router();

userRouter.post('/',
    async (req:Request,res:Response)=>{
    const {email,firstName,lastName,password,admin} = req.body;
    const user = new User();
    user.email = email;
    user.firstName = firstName;
    user.lastName = lastName;
    user.password = password;
    user.admin = admin;

    const response = await createUser(user);
    if(response){
        res.status(200).send(response);
    }else{
        res.status(500).send();
    }

});


userRouter.post('/login',
    async (req:Request,res:Response)=>{
        const {email,password} = req.body;
        const response = await(checkCredentials(email,password));
        res.send(response);
    });

type Decoded = {
    email:string;
    iat:number;
    exp:number;

}
userRouter.post(
    '/refreshtoken',
    (req:Request,res:Response)=>{

        const refreshToken = req.body.refreshToken;
        if(refreshToken===null) res.sendStatus(401);
        if(!refreshTokens.includes(refreshToken)) {
            console.log(refreshTokens,refreshToken);
            res.sendStatus(403);
        }else{
            // @ts-ignore
            jwt.verify(refreshToken,process.env.REFRESH_TOKEN_KEY,(err,decoded:Decoded)=>{
                if(err) {
                    console.log(456);
                    res.sendStatus(403);
                }else{
                    // @ts-ignore
                    const accessToken = jwt.sign({email:"decoded.email"}, process.env.Token_KEY,{expiresIn:'300s'});
                    res.send({accessToken,refreshToken});
                }

            });
        }


    }
)


export default userRouter;
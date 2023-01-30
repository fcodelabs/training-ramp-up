import express, { Request, Response } from 'express'
import {createUser} from '../controllers/userController'
import {User} from "../models/user";

const userRouter: express.Router = express.Router();

userRouter.post('/',
    async (req:Request,res:Response)=>{
    const {email,firstName,lastName,password} = req.body;
    const user = new User();
    user.email = email;
    user.firstName = firstName;
    user.lastName = lastName;
    user.password = password;

    const response = await createUser(user);
    if(response){
        res.status(200).send(response);
    }else{
        res.status(500).send();
    }

});

export default userRouter;
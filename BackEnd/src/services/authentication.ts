import { Request, Response } from 'express';
const bcrypt = require('bcrypt');

export async function signUpUser(req: Request, res: Response) {
    try{
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        console.log(hashedPassword)
        res.status(201).send('hashed password '+ hashedPassword)
    } catch{
        
    }
}
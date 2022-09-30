import { Users } from "../entities/user.entity";
import { Request, Response } from "express";
import { FindOptionsWhere } from "typeorm";
require('dotenv').config();
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');



export const postUser = async (req: Request, res: Response) => {
  console.log("post student", req.body);

  

  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(req.body.Password, salt);
  console.log("hash",hash)
  
  const { User, Email } = req.body;
  const user = Users.create({
    User: User,
    Password: hash,
    Email: Email,
    Role: "User",
  });
  await user.save();
  res.json(user);
};


export const findUser = async (req: Request , res: Response) => {
  

  const user = await Users.findOneBy({Email : req.query.email as FindOptionsWhere<string> });
  console.log("User",user)
  const accessToken = jwt.sign(req.query.email, process.env.ACCESS_TOKEN_KEY);

  if (user) {
   
    const value = await bcrypt.compare(req.query.password , user.Password);
    
  
    console.log(value);
    if (value) {     
      return res.send({ user: user,accessToken:accessToken });
    } 
  } else {
    console.log('User not here');
  }

};

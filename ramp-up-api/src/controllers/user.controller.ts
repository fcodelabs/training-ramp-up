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
  const hash = bcrypt.hashSync(req.body.password, salt);
  console.log("hash",hash)
  
  const { User, email } = req.body;
  const user = Users.create({
    User: User,
    password: hash,
    email: email,
    role: "User",
  });
  await user.save();
  // res.json(user);
  return res.json(user).status(200);
};


export const findUser = async (req: Request , res: Response) => {
  

  const user = await Users.findOneBy({email : req.query.email as FindOptionsWhere<string> });
  console.log("User",user)
  const accessToken = jwt.sign(req.query.email, process.env.ACCESS_TOKEN_KEY);

  if (user) {
   
    const value = await bcrypt.compare(req.query.password , user.password);
    
  
    console.log(value);
    if (value) {     
      return res.send({ user: user,accessToken:accessToken });
    } 
  } else {
    console.log('User not here');
  }

};

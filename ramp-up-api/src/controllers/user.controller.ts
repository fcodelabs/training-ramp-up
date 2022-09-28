import { Users } from "../entities/user.entity";
import { Request, Response } from "express";
// import { Resolver } from "dns";

// const jwt = require("jsonwebtoken");
require("dotenv").config();
const bcrypt = require("bcrypt");
const saltRounds = 10;

export const postUser = async (req: Request, res: Response) => {
  console.log("post student", req.body);

  //   const accessToken = jwt.sign(req.body.email, process.env.ACCESS_TOKEN_KEY);

  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(req.body.Password, salt);
  
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
  console.log("Finding user here", req.query);
  const user = await Users.findOneBy({ Email: req.body.Email  });
  console.log('UserDetails', user);
  if (user) {
    const value = await bcrypt.compare(req.query.Password, user.Password);
    console.log(value);
    if (value) {     
      return res.send({ user: user });
    } 
  } else {
    console.log('User not here');
  }

};

import { Users } from "../entities/user.entity";
// import { Request, Response } from "express";
// import { FindOptionsWhere } from "typeorm";
require("dotenv").config();
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

export const postUser = async (userDetails:any) => {
  
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(userDetails.password, salt);
  console.log("hash", hash);

  const { User, email } = userDetails;
  const user = await Users.save({
    User: User,
    password: hash,
    email: email,
    role: "User",
  });
  // await user.save();
 return user
  // return res.json(user).status(200);
};

export const findUser = async (req: any) => {
  
  const user = await Users.findOneBy({
    email: req.email 
  });

  if (user) {
    const value = await bcrypt.compare(req.password, user.password);
    if (value) {

       return user
        // {
      //   user:user,
      //   //accessToken:accessToken
      // } ;
    }
    else {
      return {error:"user not here"};
      }
    }
   else {
    console.log("User not here");
  }
};

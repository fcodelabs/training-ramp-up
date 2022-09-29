import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import { Request, Response } from "express";
import * as crypto from "crypto";
import * as jwt from "jsonwebtoken";

export const addUser = async (req: Request, res: Response) => {
  const { username, password } = req.body.payload;
  const userRepository = AppDataSource.getRepository(User);
  const userData = await userRepository.findOne({
    where: { UserName: `${username}` },
  });
  if (userData) {
    res.send({ error: "User already exists" });
  } else {
    const newUser = new User();
    newUser.UserName = username;
    const salt = crypto.randomBytes(16);
    crypto.pbkdf2(
      password,
      salt,
      310000,
      32,
      "sha256",
      async function (err, hashedPassword) {
        newUser.Password = hashedPassword.toString("base64");
        newUser.Salt = salt.toString("base64");
        const token = jwt.sign(
          { UserName: username, Password: newUser.Password },
          process.env.TOKEN_KEY as string,
          {
            expiresIn: "2h",
          }
        );
        newUser.Token = token;
        try {
          await AppDataSource.manager.save(newUser);
          res.send(newUser);
        } catch {
          res.send({ error: "Could not sign up" });
        }
      }
    );
  }
};

export const getUser = async (req: Request, res: Response) => {
  const { username, password } = req.body.payload;
  const userRepository = AppDataSource.getRepository(User);
  const userData = await userRepository.findOne({
    where: { UserName: `${username}` },
  });
  if (userData) {
    crypto.pbkdf2(
      password,
      Buffer.from(userData.Salt as string, "base64"),
      310000,
      32,
      "sha256",
      async function (err, hashedPassword) {
        if (
          crypto.timingSafeEqual(
            Buffer.from(userData.Password as string, "base64"),
            hashedPassword
          )
        ) {
          const token = jwt.sign(
            { UserName: username, Password: userData.Password },
            process.env.TOKEN_KEY as string,
            {
              expiresIn: "2h",
            }
          );
          userData.Token = token;
          try {
            await AppDataSource.manager.update(
              User,
              { UserName: username },
              userData
            );
            res.send(userData);
          } catch (err) {
            res.send({ error: "Could not sign in" });
          }
        } else {
          res.send({ error: "Incorrect password" });
        }
      }
    );
  } else {
    res.send({ error: "User does not exist" });
  }
};

export const refreshUser = async (req: Request, res: Response) => {
  const userName = req.body.payload;
  const userRepository = AppDataSource.getRepository(User);
  const userData = await userRepository.findOne({
    where: { UserName: `${userName}` },
  });
  if (userData) {
    try {
      jwt.verify(userData.Token, process.env.TOKEN_KEY as string);
      res.status(200).send(userData.Token);
    } catch (err) {
      res.status(401).send("Invalid Token");
    }
  }
};

export const signOutUser = async (req: Request, res: Response) => {
  const userName = req.body.payload;
  const userRepository = AppDataSource.getRepository(User);
  const userData = await userRepository.findOne({
    where: { UserName: `${userName}` },
  });
  if (userData) {
    userData.Token = "";
    try {
      AppDataSource.manager.update(User, { UserName: `${userName}` }, userData);
      res.send("User signed out");
    } catch (err) {
      res.send("Error signing out user");
    }
  }
};

import { User } from "../entity/User";
import { Request, Response } from "express";
import * as crypto from "crypto";
import * as jwt from "jsonwebtoken";
import * as userService from "../services/users";

export const addUser = async (req: Request, res: Response) => {
  const { username, password } = req.body.payload;
  const userData = await userService.findUser(username);
  if (userData) {
    res.send({ error: "User already exists" });
  } else {
    const newUser = new User();
    newUser.username = username;
    const salt = crypto.randomBytes(16);
    crypto.pbkdf2(
      password,
      salt,
      310000,
      32,
      "sha256",
      async function (err, hashedPassword) {
        newUser.password = hashedPassword.toString("base64");
        newUser.salt = salt.toString("base64");
        const token = jwt.sign(
          { userName: username, password: newUser.password },
          process.env.TOKEN_KEY as string,
          {
            expiresIn: "2h",
          }
        );
        newUser.token = token;
        try {
          await userService.createUser(newUser);
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
  const userData = await userService.findUser(username);
  if (userData) {
    crypto.pbkdf2(
      password,
      Buffer.from(userData.salt as string, "base64"),
      310000,
      32,
      "sha256",
      async function (err, hashedPassword) {
        if (
          crypto.timingSafeEqual(
            Buffer.from(userData.password as string, "base64"),
            hashedPassword
          )
        ) {
          const token = jwt.sign(
            { userName: username, password: userData.password },
            process.env.TOKEN_KEY as string,
            {
              expiresIn: "2h",
            }
          );
          userData.token = token;
          try {
            await userService.updateUser(username, userData);
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
  const userData = await userService.findUser(userName);
  if (userData) {
    try {
      jwt.verify(userData.token, process.env.TOKEN_KEY as string);
      res.status(200).send(userData.token);
    } catch (err) {
      res.status(401).send("Invalid Token");
    }
  }
};

export const signOutUser = async (req: Request, res: Response) => {
  const userName = req.body.payload;
  const userData = await userService.findUser(userName);
  if (userData) {
    userData.token = "";
    try {
      userService.updateUser(userName, userData);
      res.send("User signed out");
    } catch (err) {
      res.send("Error signing out user");
    }
  }
};

import { Request, Response } from "express";
import { User } from "../models/userModel";
import { AppDataSource } from "../configs/dbConfig";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// const userRepository = AppDataSource.getRepository(User);

export async function registerStudent(req) {
  const checkEmail = await AppDataSource.getRepository(User).findOneBy({
    email: req.body.email,
  });

  if (checkEmail) {
    return false;
  } else {
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);
    const newUser = {
      email: req.body.email,
      password: password,
      userRole: "student",
    };
    const student = AppDataSource.manager.create(User, newUser);
    const regStudent = await AppDataSource.manager.save(student);
    return regStudent;
  }
}

export async function loginService(req) {
  //check whether user is existed
  const user = await AppDataSource.getRepository(User).findOneBy({
    email: req.body.email,
  });
  if (!user) {
    return false;
  }

  //check the password
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) {
    return false;
  }

  return user;
}

export async function handleRefreshTokenService(req) {
  const cookies = req.cookies;

  if (!cookies) throw new Error("Invalid Token");
  const refreshToken = cookies.jwt;

  if (!refreshToken) throw new Error("Invalid Token");
  const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
  const accessToken = await jwt.sign(
    { payload: decoded.payload },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "10s" }
  );
  return accessToken;
}

import { Request, Response } from "express";
import { validateUser } from "../models/userModel";

import {
  loginService,
  handleRefreshTokenService,
} from "../services/userServices";
const generateOutput = require("../utils/outputFactory");

const jwt = require("jsonwebtoken");
require("dotenv").config();

export async function login(req: Request, res: Response) {
  //validating the user
  const error1 = validateUser(req.body);
  if (error1)
    return res
      .status(400)
      .send(generateOutput(400, "validation error1", error1.message));
  try {
    let user = await loginService(req);
    console.log("user", user);
    if (!user) {
      return res
        .status(201)
        .send(generateOutput(201, "Invalid email or password", null));
    }
    const payload = { email: user.email, userRole: user.userRole };
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "10s",
    });
    const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: "1d",
    });
    console.log("accessToken: " + accessToken);
    res
      .cookie("jwt", refreshToken, {
        httpOnly: true,
        sameSite: "none",
        secure: true,

        maxAge: 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json({
        accessToken: accessToken,
        email: user.email,
        userRole: user.userRole,
      });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ err });
  }
}

export async function handleRefreshToken(req: Request, res: Response) {
  try {
    const accessToken = await handleRefreshTokenService(req);
    res.status(200).json({ accessToken });
  } catch (err) {
    return res.status(401).send(generateOutput(401, "error", err.message));
  }
}

export async function logout(req: Request, res: Response) {
  const cookies = req.cookies;
  console.log(cookies);
  if (!cookies.jwt)
    return res.status(401).send(generateOutput(401, "error", "Unauthorized"));
  res.clearCookie("jwt", {
    httpOnly: true,
    sameSite: "none",
    secure: true,
    maxAge: 24 * 60 * 60 * 1000,
  });
  res.status(200).send(generateOutput(200, "success", "Logout successfully!"));
}

module.exports = { login, handleRefreshToken, logout };

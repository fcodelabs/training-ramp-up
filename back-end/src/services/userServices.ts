import { Request, Response } from "express";
import { User } from "../models/userModel";
import { AppDataSource } from "../configs/dbConfig";
const bcrypt = require("bcrypt");

export async function registerStudent(req: Request) {
  const checkEmail = await AppDataSource.getRepository(User).findOne({
    where: { email: req.body.email },
  });

  if (checkEmail) {
    throw new Error("Email already exists");
  } else {
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);
    const newUser = {
      email: req.body.email,
      password: password,
      userRole: "student",
    };
    const student = AppDataSource.getRepository(User).create(newUser);
    const regStudent = await AppDataSource.getRepository(User).save(student);
    global.io.emit("notify", { message: `New student added` });
    return regStudent;
  }
}

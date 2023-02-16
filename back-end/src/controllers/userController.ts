import { Request, Response, NextFunction } from "express";
import { validateUser } from "../models/userModel";
import { AppDataSource } from "../configs/dbConfig";
import { registerStudent } from "../services/userServices";
const generateOutput = require("../utils/outputFactory");

async function regStudent(req: Request, res: Response, next: NextFunction) {
  const error = validateUser(req.body);
  if (error) {
    console.log(error);
    res.status(400).send(generateOutput(400, "error", error.message));
  } else {
    try {
      const savedStudent = await registerStudent(req);

      if (!savedStudent) {
        return res.status(200).send(generateOutput(200, "error", "error"));
      }
      res.status(201).send(generateOutput(201, "success", savedStudent));
    } catch (error) {
      next(error);
    }
  }
}

module.exports = { regStudent };

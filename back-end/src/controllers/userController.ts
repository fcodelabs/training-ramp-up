import { Request, Response } from "express";
import { validateUser } from "../models/userModel";
import { AppDataSource } from "../configs/dbConfig";
import { registerStudent } from "../services/userServices";
const generateOutput = require("../utils/outputFactory");

async function regStudent(req: Request, res: Response) {
  const error = validateUser(req.body);
  if (error) {
    console.log(error);
    res.status(400).send(generateOutput(400, "error", error.message));
  } else {
    try {
      const savedStudent = await registerStudent(req);
      res.status(201).send(generateOutput(201, "success", savedStudent));
    } catch (error) {
      res.status(500).send(generateOutput(500, "error", error.message));
    }
  }
}

module.exports = { regStudent };

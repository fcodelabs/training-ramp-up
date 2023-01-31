import { Request, Response } from "express";
import { Student } from "../models/StudentModel";
import { AppDataSource } from "../configs/dbConfig";
import {
  getStudentsS,
  addStudentS,
  updateStudentS,
  deleteStudentS,
} from "../services/studentServices";
const generateOutput = require("../utils/outputFactory");

async function getStudents(res: Response) {
  try {
    const students = await getStudentsS();
    res.status(201).send(generateOutput(201, "success", students));
  } catch (error) {
    res.status(500).send(generateOutput(500, "error", "Something went wrong"));
  }
}

async function addStudent(req: Request, res: Response) {
  try {
    const savedStudent = await addStudentS(req);
    res.status(201).send(generateOutput(201, "success", savedStudent));
  } catch (error) {
    res.status(500).send(generateOutput(500, "error", "Something went wrong"));
  }
}

async function updateStudent(req: Request, res: Response) {
  try {
    const updatedStudent = await updateStudentS(req);
    res.status(201).send(generateOutput(201, "success", updatedStudent));
  } catch (error) {
    res.status(500).send(generateOutput(500, "error", "Something went wrong"));
  }
}

async function deleteStudent(req: Request, res: Response) {
  try {
    const student = await deleteStudentS(parseInt(req.params.id, 10));
    res.status(201).send(generateOutput(201, "success", student));
  } catch (error) {
    console.log(error);
    res.status(500).send(generateOutput(500, "error", "Something went wrong"));
  }
}

module.exports = {
  getStudents,
  addStudent,
  updateStudent,
  deleteStudent,
};

import { Request, Response } from "express";
import {
  Student,
  validateStudent,
  validateStudentUpdate,
} from "../models/StudentModel";
import { AppDataSource } from "../configs/dbConfig";
import {
  getAllStudents,
  addStudentDetails,
  updateStudentDetails,
  deleteAStudent,
} from "../services/studentServices";
const generateOutput = require("../utils/outputFactory");

export async function getStudents(req: Request, res: Response) {
  try {
    const students = await getAllStudents();
    res.status(201).send(generateOutput(201, "success", students));
  } catch (error) {
    res.status(500).send(generateOutput(500, "error", "Something went wrong"));
  }
}

export async function addStudent(req: Request, res: Response) {
  const error = validateStudent(req.body);
  if (error) {
    console.log(error);
    res.status(400).send(generateOutput(400, "error", error.message));
  } else {
    try {
      const savedStudent = await addStudentDetails(req);
      res.status(201).send(generateOutput(201, "success", savedStudent));
    } catch (error) {
      res
        .status(500)
        .send(generateOutput(500, "error", "Something went wrong"));
    }
  }
}

export async function updateStudent(req: Request, res: Response) {
  const error = validateStudent(req.body);
  if (error) {
    console.log(error);
    res.status(400).send(generateOutput(400, "error", error.message));
  } else {
    try {
      const updatedStudent = await updateStudentDetails(req);
      res.status(201).send(generateOutput(201, "success", updatedStudent));
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .send(generateOutput(500, "error", "Something went wrong"));
    }
  }
}

export async function deleteStudent(req: Request, res: Response) {
  try {
    const student = await deleteAStudent(parseInt(req.params.id, 10));
    res.status(201).send(generateOutput(201, "success", student));
  } catch (error) {
    res.status(500).send(generateOutput(500, "error", "Something went wrong"));
  }
}

module.exports = {
  getStudents,
  addStudent,
  updateStudent,
  deleteStudent,
};

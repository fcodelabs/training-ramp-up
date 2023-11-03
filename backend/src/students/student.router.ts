import express from "express";
import type { Request, Response } from "express";
import { body, validationResult } from "express-validator";

import * as StudentService from "./student.service";

export const studentRouter = express.Router();

// GET: List of all Students
studentRouter.get("/", async (request: Request, response: Response) => {
  try {
    const students = await StudentService.listStudents();
    return response.status(200).json(students);
  } catch (error: any) {
    return response.status(500).json(error.message);
  }
});

// GET: A single Student by ID
studentRouter.get("/:id", async (request: Request, response: Response) => {
  const id: number = parseInt(request.params.id, 10);
  try {
    const student = await StudentService.getStudent(id);
    if (student) {
      return response.status(200).json(student);
    }
    return response.status(404).json("Student could not be found");
  } catch (error: any) {
    return response.status(500).json(error.message);
  }
});

// POST: Create a Student
studentRouter.post(
  "/",
  body("name").isString(),
  body("gender").isString(),
  body("address").isString(),
  body("mobileNo").isString(),
  body("dateOfBirth").isString(),
  body("age").isNumeric(),
  async (request: Request, response: Response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }
    try {
      const student = request.body;
      const newStudent = await StudentService.createStudent(student);
      return response.status(201).json(newStudent);
    } catch (error: any) {
      return response.status(500).json(error.message);
    }
  }
);

// PUT: Updating an Author
studentRouter.put(
  "/:id",
  body("name").isString(),
  body("gender").isString(),
  body("address").isString(),
  body("mobileNo").isString(),
  body("dateOfBirth").isString(),
  body("age").isNumeric(),
  async (request: Request, response: Response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }
    const id: number = parseInt(request.params.id, 10);
    try {
      const student = request.body;
      const updateStudent = await StudentService.updateStudent(student, id);
      return response.status(200).json(updateStudent);
    } catch (error: any) {
      return response.status(500).json(error.message);
    }
  }
);

// DELETE: Delete an author based on the id
studentRouter.delete("/:id", async (request: Request, response: Response) => {
  const id: number = parseInt(request.params.id, 10);
  try {
    await StudentService.deleteStudent(id);
    return response.status(204).json("Student has been successfully deleted");
  } catch (error: any) {
    return response.status(500).json(error.message);
  }
});

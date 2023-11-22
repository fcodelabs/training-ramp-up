import type { Request, Response } from "express";
import { body, validationResult } from "express-validator";

import * as StudentService from "../services/student.services";
import { io } from "..";

// GET: List of all Students
export const getStudents = async (request: Request, response: Response) => {
  try {
    const students = await StudentService.listStudents();
    return response.status(200).json(students);
  } catch (error: any) {
    return response.status(500).json(error.message);
  }
};

// GET: A single Student by ID
export const getStudent = async (request: Request, response: Response) => {
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
};

// POST: Create a Student
export const createStudent = async (request: Request, response: Response) => {
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    return response.status(400).json({ errors: errors.array() });
  }
  try {
    const student = request.body;
    const newStudent = await StudentService.createStudent(student);
    io.emit("Notification", {
      message: "A new student has been created",
    });
    return response.status(201).json(newStudent);
  } catch (error: any) {
    return response.status(500).json(error.message);
  }
};

// PUT: Updating a Student
export const updateStudent = async (request: Request, response: Response) => {
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    return response.status(400).json({ errors: errors.array() });
  }
  const id: number = parseInt(request.params.id, 10);
  try {
    const student = request.body;
    const updateStudent = await StudentService.updateStudent(student, id);
    io.emit("Notification", {
      message: "Student has been updated",
    });
    return response.status(200).json(updateStudent);
  } catch (error: any) {
    return response.status(500).json(error.message);
  }
};

// DELETE: Delete a student based on the id
export const deleteStudent = async (request: Request, response: Response) => {
  const id: number = parseInt(request.params.id, 10);
  try {
    await StudentService.deleteStudent(id);
    io.emit("Notification", {
      message: "Student has been deleted",
    });
    return response.status(204).json("Student has been successfully deleted");
  } catch (error: any) {
    return response.status(500).json(error.message);
  }
};

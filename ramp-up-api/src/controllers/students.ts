import { Student } from "../entity/Student";
import { Request, Response } from "express";
import * as studentService from "../services/students";

export const getStudents = async (req: Request, res: Response) => {
  try {
    const students = await studentService.getStudents();
    res.status(200).send(students);
  } catch {
    console.log(`Error getting students`);
    res.status(400).send([]);
  }
};

export const addStudent = async (req: Request, res: Response) => {
  const { name, gender, address, number, birthday, age } = req.body;
  const newStudent = new Student();
  newStudent.name = name;
  newStudent.gender = gender;
  newStudent.address = address;
  newStudent.number = number;
  newStudent.birthday = birthday;
  newStudent.age = age;

  try {
    await studentService.addStudent(newStudent);
    res.status(200).send(`Student added to database`);
  } catch {
    res.status(400).send(`Error adding student`);
  }
};

export const deleteStudent = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await studentService.deleteStudent(id);
    res.status(200).send(`Student with the id ${id} deleted from database`);
  } catch {
    res.status(400).send(`Error deleting student`);
  }
};

export const updateStudent = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, gender, address, number, birthday, age } = req.body;
  const newStudent = new Student();
  newStudent.name = name;
  newStudent.gender = gender;
  newStudent.address = address;
  newStudent.number = number;
  newStudent.birthday = birthday;
  newStudent.age = age;
  try {
    await studentService.updateStudent(id, newStudent);
    res.status(200).send(`Student with the id ${id} has been updated`);
  } catch {
    res.status(400).send(`Error updating student`);
  }
};

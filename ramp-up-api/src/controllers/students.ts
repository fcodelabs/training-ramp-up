import { AppDataSource } from "../data-source";
import { Student } from "../entity/Student";
import { Request, Response } from "express";

export const getStudents = async (req: Request, res: Response) => {
  const students = await AppDataSource.manager.find(Student);
  res.send(students);
};

export const addStudent = async (req: Request, res: Response) => {
  const { ID, Name, Gender, Address, Number, Birthday, Age } = req.body;
  const newStudent = new Student();
  newStudent.ID = ID;
  newStudent.Name = Name;
  newStudent.Gender = Gender;
  newStudent.Address = Address;
  newStudent.Number = Number;
  newStudent.Birthday = Birthday;
  newStudent.Age = Age;

  await AppDataSource.manager.save(newStudent);

  res.send(`Student added to database`);
};

export const deleteStudent = async (req: Request, res: Response) => {
  const { ID } = req.params;
  await AppDataSource.manager.delete(Student, { ID: ID });
  res.send(`Student with the id ${ID} deleted from database`);
};

export const updateStudent = async (req: Request, res: Response) => {
  const { ID } = req.params;
  const { Name, Gender, Address, Number, Birthday, Age } = req.body;
  const newStudent = new Student();
  newStudent.ID = ID;
  newStudent.Name = Name;
  newStudent.Gender = Gender;
  newStudent.Address = Address;
  newStudent.Number = Number;
  newStudent.Birthday = Birthday;
  newStudent.Age = Age;
  await AppDataSource.manager.update(Student, { ID: ID }, newStudent);

  res.send(`Student with the id ${ID} has been updated`);
};

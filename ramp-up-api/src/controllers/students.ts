import { AppDataSource } from "../data-source";
import { Student } from "../entity/Student";
import { Request, Response } from "express";

export const getStudents = async (req: Request, res: Response) => {
  try {
    const students = await AppDataSource.manager.find(Student);
    res.send(students);
  } catch {
    console.log(`Error getting students`);
    res.send([]);
  }
};

export const addStudent = async (req: Request, res: Response) => {
  const { Name, Gender, Address, Number, Birthday, Age } = req.body;
  const newStudent = new Student();
  newStudent.Name = Name;
  newStudent.Gender = Gender;
  newStudent.Address = Address;
  newStudent.Number = Number;
  newStudent.Birthday = Birthday;
  newStudent.Age = Age;

  try {
    await AppDataSource.manager.save(newStudent);
    res.send(`Student added to database`);
  } catch {
    res.send(`Error adding student`);
  }
};

export const deleteStudent = async (req: Request, res: Response) => {
  const { ID } = req.params;
  try {
    await AppDataSource.manager.delete(Student, { ID: parseInt(ID) });
    res.send(`Student with the id ${ID} deleted from database`);
  } catch {
    res.send(`Error deleting student`);
  }
};

export const updateStudent = async (req: Request, res: Response) => {
  const { ID } = req.params;
  const { Name, Gender, Address, Number, Birthday, Age } = req.body;
  const newStudent = new Student();
  newStudent.Name = Name;
  newStudent.Gender = Gender;
  newStudent.Address = Address;
  newStudent.Number = Number;
  newStudent.Birthday = Birthday;
  newStudent.Age = Age;
  try {
    await AppDataSource.manager.update(
      Student,
      { ID: parseInt(ID) },
      newStudent
    );
    res.send(`Student with the id ${ID} has been updated`);
  } catch {
    res.send(`Error updating student`);
  }
};

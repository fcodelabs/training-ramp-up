import { Request, Response } from "express";
import { Student } from "../entities/studentEntity";

export const addStudent = async (req: Request, res: Response) => {
  const student = Student.create({
    name: req.body.name,
    gender: req.body.gender,
    address: req.body.address,
    mobile: req.body.mobile,
    birthday: req.body.birthday,
    age: req.body.age,
  });
  await student.save();
  return res.json();
};

export const getAllStudents = async (req: Request, res: Response) => {
  const students = Student.find();
  res.send(students);
};

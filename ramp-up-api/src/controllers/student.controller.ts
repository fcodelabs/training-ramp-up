import { Student } from "../entities/student.entity";
import { Request, Response } from "express";

export const getStudent = async (req: Request, res: Response) => {
  const student = await Student.find();
  console.log("testing the getStudent", student);
  res.send(student);
};

export const postStudent = async (req: Request, res: Response) => {
  console.log("post student", req.body);
  const { studentName, gender, address, mobileNo, dob, age } = req.body;
  const student = Student.create({
    studentName: studentName,
    gender: gender,
    address: address,
    mobileNo: mobileNo,
    dob: dob,
    age: age,
  });
  await student.save();
  res.json(student);
  return res.status(200);
};

export const deleteStudent = async (req: Request, res: Response) => {
  const { id } = req.params;
  const response = await Student.delete(id);
  return res.json(response);
};

export const updateStudent = async (req: Request, res: Response) => {
  const student = await Student.findOne({
    where: { ID: parseInt(req.params.id) },
  });
  Student.merge(student, req.body);
  const result = await Student.save({ ...student });
  console.log(student);
  console.log({ ...student });
  return res.json(result);
};

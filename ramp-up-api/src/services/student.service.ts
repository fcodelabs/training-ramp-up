import { Student } from "../entities/student.entity";
import {Request, Response} from "express";
// import { request } from "http";

export const getStudent = async (req: Request, res: Response) => {
  const student = await Student.find();
  res.send(student);
};


export const postStudent = async (req: Request, res:Response) => {
  const { StudentName, Gender, Address, MobileNo, DOB } = req.body;
  const student = Student.create({
    StudentName: StudentName,
    Gender: Gender,
    Address: Address,
    MobileNo: MobileNo,
    DOB: DOB,
    // Age: Age,
  });
  await student.save();
  res.json(student);
  return res.status(200);
};

export const deleteStudent = async (req: Request, res:Response) => {
  const { studentId } = req.params;
  const response = await Student.delete(studentId);
  return res.json(response);
};

export const updateStudent = async (req: Request, res:Response) => {
 
  const student = await Student.findOne({
    where: { ID: parseInt(req.params.studentId) },
  });
  

  Student.merge(student, req.body);
  // const result = await Student.save(student);
  // res.json(result);
};


import { BaseEntity, DeepPartial } from "typeorm";
import { Student } from "../entities/studentEntity";

//create student
export const createStudentService = async (
  name: string,
  gender: string,
  address: string,
  mobile: number,
  birthday: string,
  age: number
) => {
  return await Student.create({
    name: name,
    gender: gender,
    address: address,
    mobile: mobile,
    birthday: birthday,
    age: age,
  }).save();
};

//get all students
export const getAllStudentService = async () => {
  const allStudents = await Student.find();
  return allStudents;
};

//delete student
export const deleteStudentService = async (studentId: number) => {
  return await Student.delete({ id: studentId });
};

//update student
export const findStudentService = async (studentId: number) => {
  return await Student.findOneBy({ id: studentId });
};

export const mergeStudentService = async (
  student: Student,
  body: DeepPartial<BaseEntity>
) => {
  return Student.merge(student, body);
};

export const saveStudentService = async (student: Student) => {
  return await Student.save(student);
};

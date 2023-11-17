import { error } from "console";
import { Student } from "../entity/student";
import { User } from "../entity/user";
import { db } from "../utils/db.server";

export type StudentObject = {
  id: number;
  name: string;
  gender: string;
  address: string;
  mobileNo: string;
  dateOfBirth: string;
  age: number;
};

export const listStudents = async (): Promise<StudentObject[]> => {
  return await Student.find();
};

export const getStudent = async (id: number): Promise<StudentObject | null> => {
  return Student.findOneBy({
    id: id,
  });
};

export const createStudent = async (
  student: Omit<StudentObject, "id">
): Promise<StudentObject> => {
  const { name, gender, address, mobileNo, dateOfBirth, age } = student;
  const newStudent = new Student();
  newStudent.name = name;
  newStudent.gender = gender;
  newStudent.address = address;
  newStudent.mobileNo = mobileNo;
  newStudent.dateOfBirth = dateOfBirth;
  newStudent.age = age;
  return newStudent.save();
};

export const updateStudent = async (
  student: Omit<StudentObject, "id">,
  id: number
): Promise<StudentObject> => {
  const { name, gender, address, mobileNo, dateOfBirth, age } = student;
  const studentToUpdate = await Student.findOneBy({ id: id });
  if (!studentToUpdate) {
    throw new Error("Student not found");
  }
  studentToUpdate.name = name;
  studentToUpdate.gender = gender;
  studentToUpdate.address = address;
  studentToUpdate.mobileNo = mobileNo;
  studentToUpdate.dateOfBirth = dateOfBirth;
  studentToUpdate.age = age;
  return studentToUpdate.save();
};

export const deleteStudent = async (id: number): Promise<void> => {
  const studentToDelete = await Student.findOneBy({ id: id });
  if (!studentToDelete) {
    throw new Error("Student not found");
  }
  studentToDelete.remove();
};

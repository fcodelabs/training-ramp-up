import { db } from "../utils/db.server";

export type Student = {
  id: number;
  name: string;
  gender: string;
  address: string;
  mobileNo: string;
  dateOfBirth: string;
  age: number;
};

export const listStudents = async (): Promise<Student[]> => {
  return db.student.findMany({
    select: {
      id: true,
      name: true,
      gender: true,
      address: true,
      mobileNo: true,
      dateOfBirth: true,
      age: true,
    },
  });
};

export const getStudent = async (id: number): Promise<Student | null> => {
  return db.student.findUnique({
    where: {
      id,
    },
  });
};

export const createStudent = async (
  student: Omit<Student, "id">
): Promise<Student> => {
  const { name, gender, address, mobileNo, dateOfBirth, age } = student;
  return db.student.create({
    data: {
      name,
      gender,
      address,
      mobileNo,
      dateOfBirth,
      age,
    },
    select: {
      id: true,
      name: true,
      gender: true,
      address: true,
      mobileNo: true,
      dateOfBirth: true,
      age: true,
    },
  });
};

export const updateStudent = async (
  student: Omit<Student, "id">,
  id: number
): Promise<Student> => {
  const { name, gender, address, mobileNo, dateOfBirth, age } = student;
  return db.student.update({
    where: {
      id,
    },
    data: {
      name,
      gender,
      address,
      mobileNo,
      dateOfBirth,
      age,
    },
    select: {
      id: true,
      name: true,
      gender: true,
      address: true,
      mobileNo: true,
      dateOfBirth: true,
      age: true,
    },
  });
};

export const deleteStudent = async (id: number): Promise<void> => {
  await db.student.delete({
    where: {
      id,
    },
  });
};

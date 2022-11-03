import { BaseEntity, DeepPartial } from "typeorm";
import { Student } from "../entities/studentEntity";

interface CreateStudentType {
  name: string;
  gender: string;
  address: string;
  mobile: number;
  birthday: string;
  age: number;
}

//create student
export const createStudentService = async (newStudent: CreateStudentType) => {
  try {
    const student = new Student();
    student.name = newStudent.name;
    student.gender = newStudent.gender;
    student.address = newStudent.address;
    student.mobile = newStudent.mobile;
    student.birthday = newStudent.birthday;
    student.age = newStudent.age;
    return await Student.save(student);
  } catch (err) {
    console.log("err", err);
    return { err: "Student Adding Failed" };
  }
};

//get all students
export const getAllStudentService = async () => {
  try {
    const allStudents = await Student.find({
      order: {
        id: "ASC",
      },
    });
    return allStudents;
  } catch (err) {
    return { err: "Students are not Found" };
  }
};

//delete student
export const deleteStudentService = async (studentId: number) => {
  try {
    return await Student.delete({ id: studentId });
  } catch (err) {
    return { err: "Error with Deleting Student" };
  }
};

//update student
export const findStudentService = async (studentId: number) => {
  try {
    return await Student.findOneBy({ id: studentId });
  } catch (error) {
    return { err: "Cannot Find Student" };
  }
};

export const mergeStudentService = async (
  student: Student,
  body: DeepPartial<BaseEntity>
) => {
  try {
    return Student.merge(student, body);
  } catch (error) {
    return { err: "Cannot Merge Student" };
  }
};

export const saveStudentService = async (student: Student) => {
  try {
    return await Student.save(student);
  } catch (error) {
    return { err: "Cannot Save Student" };
  }
};

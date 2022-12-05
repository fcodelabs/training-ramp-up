import { BaseEntity, DeepPartial } from 'typeorm';
import { Student } from '../entities/studentEntity';

// import { Student } from '../models/student';
// const students: Array<Student> = [];

export const addStudentService = async (
  id: number,
  name: string,
  gender: string,
  address: string,
  mobile: string,
  birthday: string
) => {
  return Student.create({
    id: id,
    name: name,
    gender: gender,
    address: address,
    mobile: mobile,
    birthday: birthday,
  }).save();
};

export const getAllStudentsService = async () => {
  async function getAll() {
    return Student.find();
  }
  return getAll();
};

export const findStudentService = async (studentId: number) => {
  return await Student.findOneBy({ id: studentId });
};

export const mergeStudentService = async (student: Student, body: DeepPartial<BaseEntity>) => {
  return Student.merge(student, body);
};

export const saveStudentService = async (student: Student) => {
  return await Student.save(student);
};

export const deleteStudentService = async (id: number) => {
  async function remove(id: number) {
    return await Student.delete({ id: id });
  }
  return remove(id);
};

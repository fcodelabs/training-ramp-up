/* eslint-disable no-useless-catch */
import { Student } from '../entities/student';
import { UpdateResult } from 'typeorm';
import dataSource from '../dataSource';
import StudentType from '../interfaces/studentType';

// get all students

export const getAllStudentsService = async () => {
  try {
    const studentRepository = dataSource.getRepository(Student);
    const students = await studentRepository.find();
    return students;
  } catch (err) {
    console.log(err);
    return { err: 'Student fetching failed' };
  }
};

// add student

export const addStudentService = async (student: StudentType) => {
  try {
    const studentRepository = dataSource.getRepository(Student);
    await studentRepository.insert(student);
  } catch (err) {
    console.log(err);
    return { err: 'Student adding failed into the database' };
  }
};

// update student

export const updateStudent = async (input: Student): Promise<UpdateResult> => {
  try {
    const student = { ...input };
    const studentRepository = dataSource.getRepository(Student);
    const students = await studentRepository.update(input.id, student);
    return students;
  } catch (err) {
    throw err;
  }
};

// delete student

export const deleteStudentService = async (id: number) => {
  async function remove(id: number) {
    await Student.delete({ id: id });
  }
  return remove(id);
};

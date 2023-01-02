import { Student } from '../entities/Student';
import { BaseEntity, DeepPartial } from 'typeorm';
import dataSource from '../dataSource';
import StudentType from '../interfaces/StudentType';

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

// update or patch student

export const findStudentService = async (studentId: number) => {
  return await Student.findOneBy({ id: studentId });
};

export const mergeStudentService = async (student: Student, body: DeepPartial<BaseEntity>) => {
  return Student.merge(student, body);
};

export const saveStudentService = async (student: Student) => {
  return await Student.save(student);
};

// delete student

export const deleteStudentService = async (id: number) => {
  async function remove(id: number) {
    await Student.delete({ id: id });
  }
  return remove(id);
};

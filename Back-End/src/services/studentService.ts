import { Student } from '../entities/studentEntity';
import dataSource from '../dataSource';
import StudentType from '../interfaces/studentType';

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

export const upsertStudentService = async (student: StudentType) => {
  try {
    const studentRepository = dataSource.getRepository(Student);
    const result = await studentRepository.upsert(student, ['id']);
    return result;
  } catch (err) {
    console.log(err);
    return { err: 'Student upserting failed' };
  }
};

export const deleteStudentService = async (id: string) => {
  async function remove(id: string) {
    return await Student.delete({ id: id });
  }
  return remove(id);
};

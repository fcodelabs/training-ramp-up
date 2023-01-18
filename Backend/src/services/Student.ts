import { Student } from '../models/Student';
import { appDataSource } from '../utils/DataSource';
import StudentType from '../utils/interface';

export const addStudentService = async (student: StudentType) => {
  try {
    const studentRepo = appDataSource.getRepository(Student);
    const res = await studentRepo.save(student);
    return res;
  } catch (error) {
    throw new Error('Error in adding student');
  }
};

export const getStudentsService = async () => {
  try {
    const studentRepo = appDataSource.getRepository(Student);
    const res = await studentRepo.find({
      order: {
        id: 'ASC',
      },
    });
    return res;
  } catch (error) {
    throw new Error('Error in getting students');
  }
};

export const deleteStudentService = async (id: number) => {
  try {
    const studentRepo = appDataSource.getRepository(Student);
    const student = await studentRepo.findOne({
      where: {
        id: id,
      },
    });
    await studentRepo.delete(id);
    return student;
  } catch (error) {
    throw new Error('Error in deleting student');
  }
};

export const updateStudentService = async (id: number, student: StudentType) => {
  try {
    const studentRepo = appDataSource.getRepository(Student);
    const res = await studentRepo.update(id, student);
    return res;
  } catch (error) {
    throw new Error('Error in updating student');
  }
};

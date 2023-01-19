import { Student } from '../models/studentModel';
import { appDataSource } from '../configs/dataSourceConfig';

interface StudentType {
  id: number;
  name: string;
  gender: string;
  address: string;
  mobile: string;
  birthday: Date;
  age: number;
}

export const addStudentService = async (student: StudentType): Promise<StudentType | ErrorConstructor> => {
  try {
    const studentRepo = appDataSource.getRepository(Student);
    const res = await studentRepo.save(student);
    return res;
  } catch (error) {
    throw new Error('Error in adding student');
  }
};

export const getStudentsService = async (): Promise<StudentType[] | ErrorConstructor> => {
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

export const deleteStudentService = async (id: number): Promise<StudentType | null | ErrorConstructor> => {
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

export const updateStudentService = async (
  id: number,
  student: StudentType
): Promise<StudentType | ErrorConstructor> => {
  try {
    const studentRepo = appDataSource.getRepository(Student);
    const res = await studentRepo.update(id, student);
    return { ...student, ...res };
  } catch (error) {
    throw new Error('Error in updating student');
  }
};

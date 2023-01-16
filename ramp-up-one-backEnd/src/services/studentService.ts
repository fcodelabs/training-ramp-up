//temp data array
import { Student } from '../entities/studentEntity';
import { AppDataSource } from '../dataSource';
import { StudentModel } from '../utils/interfaces';

//get all student
export const getAllStudentService = async (): Promise<any> => {
  try {
    const studentsRepo = AppDataSource.getRepository(Student);
    const allStudent = await studentsRepo.find({ order: { id: 'DESC' } });
    return allStudent;
  } catch (error) {
    return { error: 'Can not get Student' };
  }
};

//save Student
export const saveStudentService = async (data: StudentModel): Promise<any> => {
  try {
    const student = data;
    const studentRepository = AppDataSource.getRepository(Student);
    const newStudent = await studentRepository.save(student);
    if (!newStudent) {
      return { message: 'Faild to add student !' };
    }
    return { message: 'Student added successfully !', newStudent };
  } catch (error) {
    return { error: 'Faild to add student !' };
  }
};

//update Student
export const findStudent = async (studentId: number): Promise<any> => {
  return await Student.findOneBy({ id: studentId });
};

export const updateStudentService = async (data: StudentModel): Promise<any> => {
  try {
    const student = data;
    const studentRepository = AppDataSource.getRepository(Student);
    const newStudent = await studentRepository.save(student);
    if (!newStudent) {
      return { message: 'Faild to Update student !' };
    }
    return { message: 'Student updated successfully !', newStudent };
  } catch (error) {
    return { error: 'Faild to Update student !' };
  }
};

//delete Student
export const deleteStudentService = async (id: number): Promise<any> => {
  try {
    const student = AppDataSource.getRepository(Student);
    // const studentToRemove = await student.findOneBy({ id });
    // if (!studentToRemove) {
    //   return { message: 'Faild to Delete student !' };
    // }
    const deletedStudent = await student.delete(id);
    return deletedStudent;
  } catch (error) {
    return { error: 'Faild to Delete student !' };
  }
};

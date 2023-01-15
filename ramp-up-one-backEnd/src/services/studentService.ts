//temp data array
import { Student } from '../entities/studentEntity';
import { AppDataSource } from '../dataSource';
import { StudentModel } from '../utils/interfaces';

//get all student
export const getAllStudentService = async () => {
  try {
    const studentsRepo = AppDataSource.getRepository(Student);
    const allStudent = await studentsRepo.find({ order: { id: 'DESC' } });
    return allStudent;
  } catch (error) {
    return { error:'Can not get Student' };
  }
};

//save Student
export const saveStudentService = async (data: StudentModel) => {
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
export const findStudent = async (studentId: number) => {
  return await Student.findOneBy({ id: studentId });
};

export const updateStudentService = async (data: StudentModel) => {
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
export const deleteStudentService = async (id: number) => {
  try {
    const student = AppDataSource.getRepository(Student);
    // const studentToRemove = await student.findOneBy({ id });
    // if (!studentToRemove) {
    //   return { message: 'Faild to Delete student !' };
    // }
    const deletedStudent = await student.delete(id);
    console.log('deletedStudent-',deletedStudent )
    return deletedStudent ;
  } catch (error) {
    return { error: 'Faild to Delete student !' };
  }
};

//temp data array
import { Student } from '../entities/studentEntity';
import { AppDataSource } from '../dataSource';
import { StudentModel } from '../utils/interfaces';

//get all student
export const getAllCustomerService = async () => {
  // return tempArray;
  try {
    const studentsRepo = AppDataSource.getRepository(Student);
    const allStudent = await studentsRepo.find(
      {order:{id:'DESC'}}
    );
    return allStudent;
  } catch (error) {
    return { error };
  }
};

//save Student
export const saveStudentService = async (data: StudentModel) => {
  const student = new Student();
  student.name = data.name;
  student.gender = data.gender;
  student.address = data.address;
  student.mobileNo = data.mobileNo;
  student.birth = data.birth;
  student.age = data.age;

  const studentRepository = AppDataSource.getRepository(Student);
  const newStudent = await studentRepository.save(student);
  if (!newStudent) {
    return { message: 'Faild to add student !' };
  }
  return { message: 'Student added successfully !', newStudent };
};

//update Student
export const findStudent = async (studentId: number) => {
  return await Student.findOneBy({ id: studentId });
};

export const updateStudentService = async (data: StudentModel) => {
  const student = new Student();
  student.id = data.id;
  student.name = data.name;
  student.gender = data.gender;
  student.address = data.address;
  student.mobileNo = data.mobileNo;
  student.birth = data.birth;
  student.age = data.age;
  const studentRepository = AppDataSource.getRepository(Student);
  const newStudent = await studentRepository.save(student);
  if (!newStudent) {
    return { message: 'Faild to add student !' };
  }
  return { message: 'Student updated successfully !', newStudent };
};

//delete Student
export const deleteStudentService = async (id: number) => {
  const student = AppDataSource.getRepository(Student);
  const studentToRemove = await student.findOneBy({ id });
  if (!studentToRemove) {
    return { message: 'Student doesn\'t exist !' };
  }
  await student.remove(studentToRemove);
  return { message: 'Student removed successfully !' };
};

//temp data array
import { Student } from '../entities/studentEntity';
import { AppDataSource } from '../dataSource';
const tempArray = [
  {
    ID: 1,
    name: 'kamal',
    gender: 'male',
    Address: 'colombo',
    MobileNo: '01124455874',
    birth: '1/14/2002',
    Age: 22,
  },
  {
    ID: 2,
    name: 'nimal',
    gender: 'male',
    Address: 'colombo',
    MobileNo: '01124455874',
    birth: '2/24/2003',
    Age: 22,
  },
];

//get all student
export const getAllCustomerService = async () => {
  // return tempArray;
  try {
    const studentsRepo = AppDataSource.getRepository(Student);
    const allStudent = await studentsRepo.find();

    return allStudent ;
  } catch (error) {
    return { error };
  }
};

//save Student
export const saveStudentService = async (data: any) => {
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
  return newStudent;
  // tempArray.push({
  //   ID: data.ID,
  //   name: data.name,
  //   gender: data.gender,
  //   Address: data.Address,
  //   MobileNo: data.MobileNo,
  //   birth: data.birth,
  //   Age: data.Age,
  // });
  // return tempArray;
};

//update Student
export const updateStudentService = async (data: any) => {
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
  return newStudent;
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

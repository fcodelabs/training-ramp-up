import { Student } from '../models/student';
const students: Array<Student> = [];

export const addStudentService = async (student: Student) => {
  async function add(student: Student) {
    students.push(student);
    return student;
  }
  return add(student);
};

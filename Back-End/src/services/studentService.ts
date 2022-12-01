import { Student } from '../models/student';
const students: Array<Student> = [];

export const addStudentService = async (student: Student) => {
  async function add(student: Student) {
    students.push(student);
    return student;
  }
  return add(student);
};

export const getAllStudentsService = async () => {
  async function getAll() {
    return students;
  }
  return getAll();
};

export const updateStudentService = async (student: Student) => {
  async function update(student: Student) {
    const index = students.findIndex((s) => s.id === student.id);
    students[index] = student;
    return student;
  }
  return update(student);
};

export const deleteStudentService = async (student: Student) => {
  async function remove(student: Student) {
    const index = students.findIndex((s) => s.id === student.id);
    students.splice(index, 1);
    return students;
  }
  return remove(student);
};

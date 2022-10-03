import { AppDataSource } from "../data-source";
import { Student } from "../entity/Student";

const getStudents = async () => AppDataSource.manager.find(Student);

const addStudent = async (newStudent: Student) =>
  AppDataSource.manager.save(newStudent);

const deleteStudent = async (id: string) =>
  AppDataSource.manager.delete(Student, { id: parseInt(id) });

const updateStudent = async (id: string, newStudent: Student) =>
  AppDataSource.manager.update(Student, { id: parseInt(id) }, newStudent);

export { getStudents, addStudent, deleteStudent, updateStudent };

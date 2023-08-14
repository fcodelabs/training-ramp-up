import { Student } from '../interfaces/studentInterface';
import axios from 'axios';

export const getAllStudentsFromApi = async () => {
  const response = await axios.get(`http://localhost:4000/students`);
  return response.data as Student[];
};

export const deleteStudentApi = async (studentId: number) => {
  await axios.delete(`http://localhost:4000/students/${studentId}`);
};

export const updateStudentApi = async (studentId: number,updatedData: Student,) => {
 const response = await axios.put(`http://localhost:4000/students/${studentId}`, updatedData,);
  return response.data as Student;
};

export const createStudentApi = async (studentData: Student) => {
  const response = await axios.post(`http://localhost:4000/students`, studentData,);
  return response.data;
};

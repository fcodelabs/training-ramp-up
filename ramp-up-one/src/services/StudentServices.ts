import axios from 'axios';
import { StudentModel } from '../utils/interfaces';

// CRUD operations

export const getStudentService = async () => {
  const res = await axios.get('http://localhost:8000/student/');
  return res;
};

export const insertStudentService = async (user: StudentModel) => {
  user.inEdit = false;
  const res = await axios.post('http://localhost:8000/student', user);
  return res;
};

export const updateStudentService = async (user: StudentModel) => {
  console.log(user);
  const res = await axios.patch('http://localhost:8000/student', user);
  return res;
};

export const deleteStudentService = async (id: number | undefined) => {
  const res = await axios.delete(`http://localhost:8000/student/${id}`);
  return res;
};

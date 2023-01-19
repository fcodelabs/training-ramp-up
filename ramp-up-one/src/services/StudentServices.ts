// import axios from 'axios';
import { StudentModel } from '../utils/interfaces';
import axios from '../utils/interceptor';
// CRUD operations

export const getStudentService = async () => {
  const res = await axios.get('/students/',
    { withCredentials: true });
  return res;
}; 

export const insertStudentService = async (user: StudentModel) => {
  user.inEdit = false;
  const res = await axios.post('/students', user, {
    withCredentials: true,
  });
  return res;
};
 
export const updateStudentService = async (user: StudentModel) => {
  console.log(user);
  const res = await axios.patch('/students', user, {
    withCredentials: true,
  });
  return res;
};

export const deleteStudentService = async (id: number | undefined) => {
  const res = await axios.delete(`/students/${id}`, {
    withCredentials: true,
  });
  return res;
};

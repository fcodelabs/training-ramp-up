// import axios from 'axios';
import { StudentModel } from '../utils/interfaces';
import axios from '../utils/interceptor';
// CRUD operations

export const getStudentService = async () => {
  const res = await axios.get('/student/',
    { withCredentials: true });
  return res;
}; 

export const insertStudentService = async (user: StudentModel) => {
  user.inEdit = false;
  const res = await axios.post('/student', user, {
    withCredentials: true,
  });
  return res;
};
 
export const updateStudentService = async (user: StudentModel) => {
  console.log(user);
  const res = await axios.patch('/student', user, {
    withCredentials: true,
  });
  return res;
};

export const deleteStudentService = async (id: number | undefined) => {
  const res = await axios.delete(`/student/${id}`, {
    withCredentials: true,
  });
  return res;
};

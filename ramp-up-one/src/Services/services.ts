/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
// import { products } from '../utils/products';
// import { StudentModel } from '../utils/interfaces';
import axios from 'axios';

// const data: StudentModel[] = [...products];

// const generateId = (data: any[]) =>
//   data.reduce(
//     (acc: number, current: { id: number }) => Math.max(acc, current.id),
//     0
//   ) + 1;

function getAge(dob: Date) {
  const diffms = Date.now() - dob.getTime();
  const agedt = new Date(diffms);

  return Math.abs(agedt.getUTCFullYear() - 1970);
}
function setDateFormat(birth: Date) {
  const dateObj = birth;
  const month = dateObj.getUTCMonth() + 1;
  const day = dateObj.getUTCDate();
  const year = dateObj.getUTCFullYear();
  const newdate = month + '/' + day + '/' + year;
  return newdate;
}

// CRUD operations

export const getStudentService = async () => {
  const res = await axios.get('http://localhost:8000/student/');
  return res;
};

export const insertStudentService = async (user: any) => {
  // user.id = generateId(data);
  user.age = getAge(new Date(user.birth));
  user.birth = setDateFormat(user.birth);
  user.inEdit = false;
  const res = await axios.post('http://localhost:8000/student', user);
  return res;
};

export const updateStudentService = async (user: any) => {
  user.age = getAge(new Date(user.birth));
  const res = await axios.put('http://localhost:8000/student', user);
  return res;
};

export const deleteStudentService = async (id: number | undefined) => {
  const res = await axios.delete(`http://localhost:8000/student/${id}`);
  return res;
};

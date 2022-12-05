/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
import { products } from '../utils/products';
import { StudentModel } from '../utils/interfaces';

const data: StudentModel[] = [...products];

const generateId = (data: any[]) =>
  data.reduce(
    (acc: number, current: { id: number }) => Math.max(acc, current.id),
    0
  ) + 1;

function getAge(dob: Date) {
  const diffms = Date.now() - dob.getTime();
  const agedt = new Date(diffms);

  return Math.abs(agedt.getUTCFullYear() - 1970);
}

function setDateFormat(birth:Date){
  const dateObj = birth;
  const month = dateObj.getUTCMonth() + 1; 
  const day = dateObj.getUTCDate();
  const year = dateObj.getUTCFullYear();
  const newdate = month + '/' + day + '/' + year;
  return newdate;
}

export const getUser = () => {
  return data;
};

export const insertUser = (user: any) => {
  user.id = generateId(data);
  user.age = getAge(new Date(user.birth));
  user.birth = setDateFormat(user.birth);
  user.inEdit = false;
  data.unshift(user);
  return data;
};

export const updateUser = (user: StudentModel) => {
  const index = data.findIndex((record) => record.id === user.id);
  data[index] = user;
  return data;
};

export const deleteUser = (user: StudentModel) => {
  const index = data.findIndex((record) => record.id === user.id);
  data.splice(index, 1);
  return data;
};

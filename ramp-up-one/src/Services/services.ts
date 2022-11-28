/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
import { products } from '../utils/products';

const data = [...products];

const generateId = (data: any[]) =>
  data.reduce(
    (acc: number, current: { ID: number }) => Math.max(acc, current.ID),
    0
  ) + 1;

function getAge(dob: Date) {
  const diffms = Date.now() - dob.getTime();
  const agedt = new Date(diffms);

  return Math.abs(agedt.getUTCFullYear() - 1970);
}

export const insertItem = (item: any) => {
  item.ID = generateId(data);
  item.Age = getAge(new Date(item.birth));
  // item.birth = new Date(item.birth).toDateString();
  item.inEdit = false;
  data.unshift(item);
  return data;
};

export const getItems = () => {
  return data;
};

export const updateItem = (item: any) => {
  const index = data.findIndex((record) => record.ID === item.ID);
  data[index] = item;
  return data;
};

export const deleteItem = (item: any) => {
  const index = data.findIndex((record) => record.ID === item.ID);
  data.splice(index, 1);
  return data;
};

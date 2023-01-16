import { User } from '../interfaces/interfaces';
import products from '../products.json'

// eslint-disable-next-line prefer-const
let data = [...products];

const generateId = (data: any[]) =>
  data.reduce((acc, current) => Math.max(acc, current.userId), 0) + 1;

  export const insertItem = (item: any) => {
    item.userId = generateId(data);
    item.inEdit = false;
    data.unshift(item);
    return data;
};

export const getItems = () => {
    return data;
  };
import { Student } from "../interfaces/interfaces";
import { sampleProducts } from "../components/sample-products";

let data = [...sampleProducts];

const generateId = () => 1;
;

export const insertItem = (item: any) => {
    item.ID = generateId();
    item.inEdit = false;
    data.unshift(item);
    return data;
};

export const getItems = () => {
    return data;
};

export const updateItem = (item: any) => {
    let index = data.findIndex(record => record.ID === item.ID);
    data[index] = item;
    return data;
};

export const deleteItem = (item: any) => {
    let index = data.findIndex(record => record.ID === item.ID);
    data.splice(index, 1);
    return data;
};

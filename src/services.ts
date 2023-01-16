import { Product } from './interfaces';
import { sampleProducts } from './sample-products';
import { DropDownList } from '@progress/kendo-react-dropdowns';
import { validateMobile, validateName, validateAddress,validateDate } from './validators'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { To } from 'react-router-dom';
const data = [...sampleProducts];

const generateId = (data: any[]) =>
    data.reduce((acc, current) => Math.max(acc, current.ID), 0) + 1;

const calcAge = (dateOfBirth: string) => {
        const today = new Date();
        const birthDate = new Date(dateOfBirth);
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
    
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }
    
        return age;
}
export const insertItem = (item: any) => {
    console.log(item);
    if(validateName(item.Name) && validateMobile(item.MobileNo) && validateAddress(item.Address) && validateDate(item.DateofBirth)){
        item.Age = calcAge(item.DateofBirth);
        item.ID = generateId(data);
        item.inEdit = false;
        data.unshift(item);
        return data;
    } else {
        return data;
    }
};

export const getItems = () => {
    return data;
};

export const updateItem = (item: any) => {
    if(validateName(item.Name) && validateMobile(item.MobileNo) && validateAddress(item.Address) && validateDate(item.DateofBirth)){
        const index = data.findIndex(record => record.ID === item.ID);
        data[index] = item;
        item.Age = calcAge(item.DateofBirth);
        return data;
    } else {
        return data;
    }
};

export const deleteItem = (item: Product) => {
    const index = data.findIndex(record => record.ID === item.ID);
    data.splice(index, 1);
    return data;
};

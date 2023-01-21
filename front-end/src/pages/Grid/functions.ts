import { Student } from './interfaces';
import { sampleStudents } from './sample-students';
import { validateMobile, validateName, validateAddress, validateDate } from './validators'
import { toast } from 'react-toastify';
const data = [...sampleStudents];

const generateId = (data: Student[]) =>
    data.reduce((acc, current) => Math.max(acc, current.ID), 0) + 1;

const age = (dateOfBirth: Date) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    return age;
}
export const insertItem = (item: Student) => {
    // console.log(item);
    if (validateName(item.Name) && validateMobile(item.MobileNo) && validateAddress(item.Address) && validateDate(item.DateofBirth)) {
        item.Age = age(item.DateofBirth);
        if (item.Age >= 18) {
            item.ID = generateId(data);
            item.inEdit = false;
            data.unshift(item);
            toast.success('Successfully Added', {
                position: toast.POSITION.TOP_RIGHT
            });
            return data;
        }
        else {
            toast.error('Age should be greater than 18', {
                position: toast.POSITION.TOP_RIGHT
            });
            return data;
        }
    } else {
        return data;
    }
};

export const getItems = () => {
    return data;
};

export const updateItem = (item: Student) => {
    if (validateName(item.Name) && validateMobile(item.MobileNo) && validateAddress(item.Address) && validateDate(item.DateofBirth)) {
        item.Age = age(item.DateofBirth);
        if (item.Age < 18) {
            toast.error('Age should be greater than 18', {
                position: toast.POSITION.TOP_RIGHT
            });
            return data;
        } else {
            const index = data.findIndex(record => record.ID === item.ID);
            data[index] = item;

            toast.success('Successfully Updated', {
                position: toast.POSITION.TOP_RIGHT
            });
            return data;
        }
    } else {
        return data;
    }
};

export const deleteItem = (item: Student) => {
    const index = data.findIndex(record => record.ID === item.ID);
    data.splice(index, 1);
    toast.success('Successfully Removed', {
        position: toast.POSITION.TOP_RIGHT
    });
    return data;
};

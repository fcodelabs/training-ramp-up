import { Student } from './interfaces';
import { sampleStudents } from './sample-students';
import { validateMobile, validateName, validateAddress, validateDate } from './validators'
import { toast } from 'react-toastify';
import axios from 'axios';
const data = [...sampleStudents];

const generateId = (data: Student[]) =>
    data.reduce((acc, current) => Math.max(acc, current.id), 0) + 1;

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
export const insertItem = async (item: Student, data: Student[]) => {
    // console.log(item);
    if (validateName(item.name) && validateMobile(item.mobile) && validateAddress(item.address) && validateDate(item.dob)) {
        item.age = age(item.dob);
        if (item.age >= 18) {
            // item.id = generateId(data);
            if(item.gender === undefined){
                item.gender = 'Male'
            }
            item.inEdit = false;
            data.unshift(item);
            await axios.post('http://localhost:8080/api/student', item).then(function (response) {
                console.log(response);
            }).catch(function (error) {
                console.log(error);
            });
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

export const updateItem = async (item: Student, data:Student[]) => {
    if (validateName(item.name) && validateMobile(item.mobile) && validateAddress(item.address) && validateDate(item.dob)) {
        item.age = age(item.dob);
        if (item.age < 18) {
            toast.error('Age should be greater than 18', {
                position: toast.POSITION.TOP_RIGHT
            });
            return data;
        } else {
            const index = data.findIndex(record => record.id === item.id);
            data[index] = item;
            const itemToUpdate = item.id;

            await axios.put(`http://localhost:8080/api/student/${itemToUpdate}`, item).then(function (response) {
                console.log(response);
            }).catch(function (error) {
                console.log(error);
            });

            toast.success('Successfully Updated', {
                position: toast.POSITION.TOP_RIGHT
            });
            return data;
        }
    } else {
        return data;
    }
};

export const deleteItem = async (item: Student, data: Student[]) => {
    const index = data.findIndex(record => record.id === item.id);
    const itemToDelete = item.id;
    data.splice(index, 1);
    await axios.delete(`http://localhost:8080/api/student/${itemToDelete}`).then(function (response) {
        console.log(response);
    }).catch(function (error) {
        console.log(error);
    });
    toast.success('Successfully Removed', {
        position: toast.POSITION.TOP_RIGHT
    });
    return data;
};

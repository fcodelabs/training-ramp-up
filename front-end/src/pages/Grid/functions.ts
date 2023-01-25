import { Student } from './interfaces';
import { sampleStudents } from './sample-students';
import { checkValid } from './validators'
import { toast } from 'react-toastify';
import axios from 'axios';
import api from '../../api';
const data = [...sampleStudents];

const generateId = (data: Student[]) =>
    data.reduce((acc, current) => Math.max(acc, current.id), 0) + 1;

export const age = (dateOfBirth: Date) => {
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
    if (checkValid(item)) {
        if (!item.gender) {
            item.gender = 'Male'
        }
        item.inEdit = false;
        try {
            const response = await api.student.postStudent(item);
            toast.success('Successfully Added', {
                position: toast.POSITION.TOP_RIGHT
            });
            return data;
        } catch (error) {
            console.log(error);
        }
    }
};

export const getItems = () => {
    return data;
};

export const updateItem = async (item: Student, data: Student[]) => {
    if (checkValid(item)) {
        const index = data.findIndex(record => record.id === item.id);
        data[index] = item;
        const itemToUpdate = item.id;
        try {
            const response = await api.student.putStudent(itemToUpdate, item);
            toast.success('Successfully Updated', {
                position: toast.POSITION.TOP_RIGHT
            });
            return data;
        } catch (error) {
            console.log(error);
        }

    }
};

export const deleteItem = async (item: Student, data: Student[]) => {
    const index = data.findIndex(record => record.id === item.id);
    const itemToDelete = item.id;
    data.splice(index, 1);

    try {
        const response = await api.student.deleteStudent(itemToDelete);
    } catch (error) {
        console.log(error);
    }

    toast.success('Successfully Removed', {
        position: toast.POSITION.TOP_RIGHT
    });
    return data;
};

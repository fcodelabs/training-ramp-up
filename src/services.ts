import { students } from "./data/students";
const data = [...students];

export const getStudents = () => {
    return data;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const generateId = (data: any[]) => {
    const ids = data.map(student => student.id);
    const maxId = Math.max(...ids);
    return maxId + 1;
}

export const insertStudent = (student: { id: number; inEdit?: boolean; name?: string; gender?: string; address?: string; mobile?: string; dateOfBirth?: string; age?: number; }) => {
    student.id = generateId(data);
    student.inEdit = false;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data.unshift(student as any);
    return data;
};

export const updateItem = (student: { id?: number; name?: string; gender?: string; address?: string; mobile?: string; dateOfBirth?: string; age?: number; }) => {
    const index = data.findIndex((record) => record.id === student.id);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data[index]  = student as any;
    return data;
  };

export const deleteItem = (item: { id: number; }) => {
    const index = data.findIndex((record) => record.id === item.id);
    data.splice(index, 1);
    return data;
  };
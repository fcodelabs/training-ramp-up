import { sampleStudent } from "./sample-student";

let data = [...sampleStudent];

const generateId = (data) =>
  data.reduce((acc, current) => Math.max(acc, current.StudentID), 0) + 1;

export const insertStudent = (item) => {
  item.StudentID = generateId(data);
  item.inEdit = false;
  data.unshift(item);
  return data;
};

export const getStudents = () => {
  return data;
};

export const updateStudent = (item) => {
  let index = data.findIndex((record) => record.StudentID === item.StudentID);
  data[index] = item;
  return data;
};

export const deleteStudent = (item) => {
  let index = data.findIndex((record) => record.StudentID === item.StudentID);
  data.splice(index, 1);
  return data;
};

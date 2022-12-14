/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

const baseURL = "http://localhost:8000";

export const getStudents = () => {
  try {
    return axios.get(baseURL + "/student");
  } catch (error) {
    console.log(error);
  }
};

export const addStudent = (student: any) => {
  try {
    return axios.post(baseURL + "/student", student);
  } catch (error) {
    console.log(error);
  }
};

export const updateStudent = (student: any) => {
  try {
    return axios.put(baseURL + "/student/" + student.id, student);
  } catch (error) {
    console.log(error);
  }
};

export const deleteStudent = (id: number) => {
  try {
    return axios.delete(baseURL + "/student/" + id);
  } catch (error) {
    console.log(error);
  }
};

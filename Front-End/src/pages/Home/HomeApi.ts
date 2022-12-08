/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

export const getStudents = () => {
  try {
    return axios.get("/student");
  } catch (error) {
    console.log(error);
  }
};

export const upsertStudent = (student: Array<any>) => {
  try {
    return axios.post("/student", student);
  } catch (error) {
    console.log(error);
  }
};

export const deleteStudent = (id: string) => {
  try {
    return axios.delete(`/student/${id}`);
  } catch (error) {
    console.log(error);
  }
};

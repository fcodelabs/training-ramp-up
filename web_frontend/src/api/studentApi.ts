import { api } from "./api";

interface IStudent {
  id: number;
  name: string;
  address: string;
  mobile: string;
  dob: string;
  gender: string;
}

export const createStudent = (student: IStudent) => {
  return api.post(`/student`, student, {
    headers: { "Content-Type": "application/json" },
  });
};

export const loadAllStudents = async (): Promise<IStudent[]> => {
  let data: IStudent[] = [];
  await api.get(`/student`).then(response => {
    data = response.data;
  });
  return data;
};

export const updateStudent = (id: number, student: IStudent) => {
  return api.put(`/student/${id}`, student, {
    headers: { "Content-Type": "application/json" },
  });
};

export const removeStudent = (id: number) => {
  return api.delete(`/student/${id}`);
};

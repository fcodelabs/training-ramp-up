import { STUDENT_API_PREFIX } from "../util/apiPrefixUtil";
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
  return api.post(STUDENT_API_PREFIX, student, {
    headers: { "Content-Type": "application/json" },
  });
};

export const loadAllStudents = async (): Promise<IStudent[]> => {
  let data: IStudent[] = [];
  await api.get(STUDENT_API_PREFIX).then(response => {
    data = response.data;
  });
  return data;
};

export const updateStudent = (id: number, student: IStudent) => {
  return api.put(`${STUDENT_API_PREFIX}/${id}`, student, {
    headers: { "Content-Type": "application/json" },
  });
};

export const removeStudent = (id: number) => {
  return api.delete(`${STUDENT_API_PREFIX}/${id}`);
};

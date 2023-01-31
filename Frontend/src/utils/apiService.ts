import axios from "../axios";
import { Student } from "./interface";

export async function getStudentsService(): Promise<Student[]> {
  const response = await axios.get("student");
  const students: Student[] = response.data;
  const modified = students.map((student) => {
    return {
      ...student,
      inEdit: false,
    };
  });
  return modified;
}

export const addStudentService = async (student: Student) => {
  await axios.post("student", student);
};

export const deleteStudentService = async (id: number) => {
  return await axios.delete(`student/${id}`);
};

export const updateStudentService = async (
  id: number,
  student: Student
): Promise<Student> => {
  return await axios.patch(`student/${id}`, student);
};

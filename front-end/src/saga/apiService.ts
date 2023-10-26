import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000/api";

export const apiService = {
  getStudents: () => axios.get(`${API_BASE_URL}/students/`),
  addStudent: (studentData: any) =>
    axios.post(`${API_BASE_URL}/students/`, studentData),
  updateStudent: (studentData: any) =>
    axios.put(`${API_BASE_URL}/students/${studentData.id}/`, studentData),
  deleteStudent: (studentId: number) =>
    axios.delete(`${API_BASE_URL}/students/${studentId}/`),
};

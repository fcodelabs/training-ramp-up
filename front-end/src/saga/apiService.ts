import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000/api";
const BaseInstance = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  withCredentials: true,
});

export const apiService = {
  getStudents: () => BaseInstance.get(`/students/`),
  addStudent: (studentData: any) =>
    BaseInstance.post(`/students/`, studentData),
  updateStudent: (studentData: any) =>
    BaseInstance.put(`/students/${studentData.id}/`, studentData),
  deleteStudent: (studentId: number) =>
    BaseInstance.delete(`/students/${studentId}/`),

  getUsers: () => BaseInstance.get(`/users/`),
  addUser: (userData: any) => BaseInstance.post(`/users/`, userData),
  updateUser: (userData: any) =>
    BaseInstance.put(`/users/${userData.id}/`, userData),
  deleteUser: (userId: number) => BaseInstance.delete(`/users/${userId}/`),
};

export const register = (
  username: string,
  email: string,
  password: string,
  role: string
) => {
  return axios.post(API_BASE_URL + "/users/", {
    username,
    email,
    password,
    role,
  });
};

export const login = async (email: string, password: string) => {
  await BaseInstance.post("/auth/login", {
    email,
    password,
  });
  const apiResponse = await BaseInstance.get("/users/detail");
  return apiResponse;
};

export const logout = async () => {
  await BaseInstance.post("/auth/logout");
};

export const getCurrentUser = () => {
  const userStr = localStorage.getItem("user");
  if (userStr) return JSON.parse(userStr);

  return null;
};

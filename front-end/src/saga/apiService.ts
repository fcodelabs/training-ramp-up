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

  getUsers: () => axios.get(`${API_BASE_URL}/users/`),
  addUser: (userData: any) => axios.post(`${API_BASE_URL}/users/`, userData),
  updateUser: (userData: any) =>
    axios.put(`${API_BASE_URL}/users/${userData.id}/`, userData),
  deleteUser: (userId: number) =>
    axios.delete(`${API_BASE_URL}/users/${userId}/`),
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
  const response = await axios.post(API_BASE_URL + "/auth/login", {
    email,
    password,
  });
  console.log("success-1");
  const apiResponse = await axios.get(API_BASE_URL + "/users/detail", {
    withCredentials: true,
  });
  console.log("success-2", response);
  return apiResponse;
};

export const getCurrentUser = () => {
  const userStr = localStorage.getItem("user");
  if (userStr) return JSON.parse(userStr);

  return null;
};

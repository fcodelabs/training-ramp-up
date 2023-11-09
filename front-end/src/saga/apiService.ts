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

export const register = (username: string, email: string, password: string) => {
  return axios.post(API_BASE_URL + "signup", {
    username,
    email,
    password,
  });
};

export const login = (username: string, password: string) => {
  return axios
    .post(API_BASE_URL + "signin", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

export const logout = () => {
  localStorage.removeItem("user");
};

export const getCurrentUser = () => {
  const userStr = localStorage.getItem("user");
  if (userStr) return JSON.parse(userStr);

  return null;
};

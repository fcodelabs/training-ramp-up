import axios from "axios";
import { GridValidRowModel } from "@mui/x-data-grid";

const url = process.env.REACT_APP_API_URL;
const userId = localStorage.getItem("userId");
export const fetchStudentsAsync = async () => {
  try {
    const response = await axios.get(`${url}/students`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addStudentsAsync = async (user: GridValidRowModel) => {
  try {
    const response = await axios.post(`${url}/students/${userId}`, user, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateStudentAsync = async (user: GridValidRowModel) => {
  try {
    const response = await axios.put(
      `${url}/students/${user.id}/${userId}`,
      user,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteStudentAsync = async (id: number) => {
  try {
    const response = await axios.delete(`${url}/students/${id}/${userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const loginAsync = async (user: any) => {
  try {
    const response = await axios.post(`${url}/login`, user, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data.token;
  } catch (error) {
    throw error;
  }
};

export const addUsersAsync = async (user: any) => {
  try {
    const newuser = {
      name: user.name,
      email: user.email,
      role: user.role,
    };
    const response = await axios.post(`${url}/email`, newuser, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

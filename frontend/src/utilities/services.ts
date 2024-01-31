import axios from "axios";
import { GridValidRowModel } from "@mui/x-data-grid";
const LocalstorageId = `${process.env.REACT_APP_API_URL}`;
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

export const loginAsync = async (newuser: any) => {
  try {
    const response: any = await axios.post(`${url}/users/login`, newuser, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("response", response);
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
    const Token = localStorage.getItem(LocalstorageId);
    const response = await axios.post(`${url}/users/email`, newuser, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${Token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const asyncAuthenticateUser = async () => {
  try {
    const Token = localStorage.getItem(LocalstorageId) || "popp";
    const temp = {
      token: Token,
    };
    await axios.post(`${url}/users/verify`, temp, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${Token}`,
      },
    });
  } catch (error) {
    throw error;
  }
};

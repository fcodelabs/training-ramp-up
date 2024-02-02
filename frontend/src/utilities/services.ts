import axios from "axios";
import { GridValidRowModel } from "@mui/x-data-grid";
const LocalstorageId = `${process.env.REACT_APP_API_URL}`;
const url = process.env.REACT_APP_API_URL;

export const fetchStudentsAsync = async () => {
  try {
    const Token = localStorage.getItem(LocalstorageId);
    const response = await axios.get(`${url}/students`, {
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

export const addStudentsAsync = async (data: GridValidRowModel) => {
  try {
    const Token = localStorage.getItem(LocalstorageId);
    const response = await axios.post(`${url}/students/${data.socketId}`, data.editedRow, {
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

export const updateStudentAsync = async (data: GridValidRowModel) => {
  try {
    const Token = localStorage.getItem(LocalstorageId);
    const response = await axios.put(
      `${url}/students/${data.editedRow.id}/${data.socketId}`,
      data.editedRow,
      {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${Token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteStudentAsync = async (data: any) => {
  try {
    const Token = localStorage.getItem(LocalstorageId);
    const response = await axios.delete(`${url}/students/${data.id}/${data.socketId}`,{
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

export const addUsersAsync = async (data: any) => {
  try {
    const newuser = {
      name: data.user.name,
      email: data.user.email,
      role: data.user.role,
    };
    const Token = localStorage.getItem(LocalstorageId);
    const response = await axios.post(`${url}/users/email/${data.socketId}`, newuser, {
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

export const asyncAuthenticateUser = async (token: any) => {
  try {
    const temp = {
      token: token,
    };
    await axios.post(`${url}/users/verify`, temp, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    throw error;
  }
};

export const signupUsersAsync = async (data: any) => {
  try {
    const body = {
      token: data.token,
      password: data.password,
    };
    const response = await axios.post(`${url}/users/signup`, body, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("response", response);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const registerUsersAsync = async (data: any) => {
  try {
    const response = await axios.post(`${url}/users/register`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

import axios from "axios";
import { GridValidRowModel } from "@mui/x-data-grid";
const LocalstorageId = `${process.env.REACT_APP_API_URL}`;
const url = process.env.REACT_APP_API_URL;

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      console.log(
        "Access token expired. Refreshing...",
        originalRequest._retry
      );
      originalRequest._retry = true;

      try {
        const response = await axios.post(
          `${url}/users/refreshtoken`,
          {},
          {
            withCredentials: true,
          }
        );

        console.log("Token refreshed successfully");

        originalRequest.headers["Authorization"] =
          `Bearer ${response.data.accessToken}`;

        console.log(
          "Retrying original request with new token:",
          originalRequest
        );

        return axios(originalRequest);
      } catch (refreshError) {
        console.error("Error refreshing token:", refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export const fetchStudentsAsync = async () => {
  try {
    const response = await axiosInstance.get(`${url}/students`, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addStudentsAsync = async (data: GridValidRowModel) => {
  try {
    const response = await axiosInstance.post(
      `${url}/students/${data.socketId}`,
      data.editedRow,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateStudentAsync = async (data: GridValidRowModel) => {
  try {
    const response = await axiosInstance.put(
      `${url}/students/${data.editedRow.id}/${data.socketId}`,
      data.editedRow,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteStudentAsync = async (data: any) => {
  try {
    const response = await axiosInstance.delete(
      `${url}/students/${data.id}/${data.socketId}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
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
      withCredentials: true,
    });
    console.log("response", response);

    return response.data;
  } catch (error) {
    console.log("error", error);
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
    const response = await axiosInstance.post(
      `${url}/users/email/${data.socketId}`,
      newuser,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const asyncAuthenticateUser = async () => {
  try {
    const temp = {
      token: "token",
    };
    const response = await axiosInstance.post(`${url}/users/verify`, temp, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    return response.data;
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

export const logoutAsync = async () => {
  try {
    const response = await axiosInstance.post(
      `${url}/users/logout`,
      {},
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("response", response.data);
    return response.data;
  } catch (error) {
    console.log("error", error);
    throw error;
  }
};

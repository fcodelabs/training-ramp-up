/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { axiosApiInstance } from "../common/axiosIntercepter";

const baseURL = "http://localhost:8000";

export const loginUserService = async (user: any) => {
  try {
    const userData = {
      email: user.email,
      password: user.password,
    };

    const responseData = await axios.post(baseURL + "/auth/login", userData, {
      withCredentials: true,
    });
    return responseData;
  } catch (error) {
    console.log(error);
  }
};

export const registerUserService = async (user: any) => {
  try {
    const userData = {
      email: user.email,
      password: user.password,
      role: user.role,
    };
    console.log(userData);
    const responseData = await axios.post(baseURL + "/auth/signup", userData, {
      withCredentials: true,
    });
    return responseData;
  } catch (error) {
    console.log(error);
  }
};

export const logoutUserService = async () => {
  try {
    const responseData = await axiosApiInstance.delete(
      baseURL + "/user/signout",
      {
        withCredentials: true,
      }
    );
    return responseData;
  } catch (error) {
    console.log(error);
    window.location.href = "/";
  }
};

export const getStudents = async () => {
  try {
    const responseData = await axiosApiInstance.get(baseURL + "/students", {
      withCredentials: true,
    });
    return responseData;
  } catch (error) {
    console.log(error);
    // window.location.href = "/";
  }
};

export const addStudent = (student: any) => {
  try {
    return axiosApiInstance.post(baseURL + "/students", student, {
      withCredentials: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateStudent = (student: any) => {
  try {
    console.log(student);
    return axiosApiInstance.patch(baseURL + "/students", student, {
      withCredentials: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteStudent = (id: number) => {
  try {
    return axiosApiInstance.delete(baseURL + "/students/" + id, {
      withCredentials: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const userDetailsService = async () => {
  try {
    console.log("userDetailsService");
    const responseData = await axiosApiInstance.post(
      baseURL + "/user/userDetails",
      "",
      {
        withCredentials: true,
      }
    );
    return responseData;
  } catch (error) {
    console.log(error);
  }
};

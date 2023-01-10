/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { axiosApiInstance } from "../common/AxiosIntercepter";

const baseURL = "http://localhost:8000";

export const loginUserService = async (user: any) => {
  try {
    const userData = {
      email: user.email,
      password: user.password,
    };

    const responseData = await axios.post(baseURL + "/user/login", userData, {
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
    const responseData = await axios.post(baseURL + "/user/signup", userData, {
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
      baseURL + "/user/logout",
      {
        withCredentials: true,
      }
    );
    return responseData;
  } catch (error) {
    console.log(error);
    window.location.href = "/signin";
  }
};

export const getStudents = async () => {
  try {
    // const accessToken = localStorage.getItem("accessToken");
    // console.log(accessToken);

    const responseData = await axiosApiInstance.get(baseURL + "/student", {
      withCredentials: true,
    });
    return responseData;
  } catch (error) {
    console.log(error);
    window.location.href = "/";
  }
};

export const addStudent = (student: any) => {
  try {
    return axiosApiInstance.post(baseURL + "/student", student, {
      withCredentials: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateStudent = (student: any) => {
  try {
    return axiosApiInstance.patch(baseURL + "/student/" + student.id, student, {
      withCredentials: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteStudent = (id: number) => {
  try {
    return axiosApiInstance.delete(baseURL + "/student/" + id, {
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

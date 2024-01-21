import axios from 'axios';
import { GridValidRowModel } from "@mui/x-data-grid";

const url = process.env.REACT_APP_API_URL;

export const fetchUsersAsync = async () => {
  try {
    const response = await axios.get(`${url}/students`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error; // You might want to handle errors in a different way based on your requirements
  }
};

export const addUsersAsync = async (user: GridValidRowModel) => {
  try {
    const response = await axios.post(`${url}/students`, user, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateUserAsync = async (user: GridValidRowModel) => {
  try {
    const response = await axios.put(`${url}/students/${user.id}`, user, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export const deleteUserAsync = async (id: number) => {
  try {
    const response = await axios.delete(`${url}/students/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

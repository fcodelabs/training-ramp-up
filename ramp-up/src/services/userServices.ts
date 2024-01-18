import { GridValidRowModel } from "@mui/x-data-grid";
const url = process.env.REACT_APP_API_URL;

export const fetchUsersAsync = async () => {
    const response = await fetch(`${url}/students`);
    const data = await response.json();
    return data;
  };
  
  export const addUsersAsync = async (user: GridValidRowModel) => {
    const response = await fetch(`${url}/students`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
    const data = await response.json();
    return data;
  };
  
 export  const deleteUserAsync = async (id: number) => {
    const response = await fetch(`${url}/students/${id}`, {
      method: "DELETE",
    });
    const data = await response.json();
    return data;
  }
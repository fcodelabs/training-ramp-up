import axios from "axios";

export async function getStudents(){
    const res = axios.get("http://localhost:8000/student",{
        withCredentials: true,
      });
    return res;
}
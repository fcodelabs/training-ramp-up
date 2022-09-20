import axios from "axios";
import { Student } from "../interfaces";

export async function getStudents(){
    const res = axios.get("http://localhost:8000/student",{
        withCredentials: true,
      });
    return res;
}

export async function deleteStudent(id:number|undefined){
    const res = axios.delete(`http://localhost:8000/student/${id}`,{
        withCredentials: true,
      });
    return res;
}

export async function addStudent(data:Student){
   
    const res = await axios.post("http://localhost:8000/student",data,{
        withCredentials: true,
      });
    return res;
}  

export async function updateStudent(data:Student){
    const res = axios.put(`http://localhost:8000/student/${data.id}`,data,{
        withCredentials: true,
      });
    return res;
}
import axios from "axios";
import { StudentDataType } from "../../../interfaces";

export  function getStudents(){
    const res = axios.get("http://localhost:8000/student",{
        withCredentials: true,
      });
    return res;
}

export  function deleteStudent({id}:any){
    const res = axios.delete(`http://localhost:8000/student/${id}`,{
        withCredentials: true,
      });
    return res;
}

export  function addStudent(data:StudentDataType){
    const res = axios.post("http://localhost:8000/student",data,{
        withCredentials: true,
      });
    return res;
}  

export  function updateStudent(data:StudentDataType){
    const res = axios.put(`http://localhost:8000/student/${data.id}`,data,{
        withCredentials: true,
      });
    return res;
}
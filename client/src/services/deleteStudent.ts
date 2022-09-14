import axios from "axios";

export async function deleteStudent(id:number|undefined){
    const res = axios.delete(`http://localhost:8000/student/${id}`);
    return res;
}
import axios from "axios";
import { Student } from "../interfaces";

export async function updateStudent(data:Student){
    const res = axios.put(`http://localhost:8000/student/${data.id}`,data);
    return res;
}
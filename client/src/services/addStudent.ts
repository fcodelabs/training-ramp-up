import axios from "axios";
import { Student } from "../interfaces";

export async function addStudent(data:Student){
   
   const res = await axios.post("http://localhost:8000/student",data);
   return res;
}   
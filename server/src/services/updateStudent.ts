import { Student } from "../models/Student";
import AppDataSource from "../util/db";

const calcAge =(dob:Date)=>{
   let today = new Date();
   let age = today.getFullYear() - dob.getFullYear();
   return age;
}

export async function updateStudent(id:number,data:any){
   try{

      const studentRepository = AppDataSource.getRepository(Student);
      const studentToUpdate = await studentRepository.findOneBy({id});
      if(!studentToUpdate){
         return {message:"Student not found !"};
      }
      const dob =new Date(data.dob)
      const age = calcAge(dob);
      const updatedStudent = await studentRepository.save({...studentToUpdate,...data,age,dob});
      if(!updatedStudent){
         return {message:"Failed to update student !"}
      }
      return {message:"Successfully updated the student !",data:updatedStudent};
   }catch(error){
      return {error}
   }
}
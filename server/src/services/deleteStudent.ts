import { Student } from "../models/Student";
import AppDataSource from "../util/db";

export async function deleteStudent(id:number){
    try{
        const studentRepository = AppDataSource.getRepository(Student);
        const studentToRemove = await studentRepository.findOneBy({id});
        if(!studentToRemove){
            return {message:"Student doesn't exist !"};
        }
        await studentRepository.remove(studentToRemove);
        return {message:"Student removed successfully !"}
    }catch(error){
        return {error}
    }
}
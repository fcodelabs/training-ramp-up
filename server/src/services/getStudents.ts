import { Student } from "../models/Student";
import AppDataSource from "../util/db";

export async function getStudents(){
    try{
        const studentRepository = AppDataSource.getRepository(Student);
        const allStudents = await studentRepository.find();
        return {students:allStudents}
    }catch(error){
        return {error}
    }
}
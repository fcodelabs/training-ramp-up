import { Student } from "../models/Student";
import AppDataSource from "../util/db"

const calcAge =(date:Date)=>{
    let today = new Date();
    let age = today.getFullYear() - date.getFullYear();
    return age;
}

export async function addStudent(data:any){
    try{
        const dob = new Date(data.dob)
        const age = calcAge(dob)
        const student = new Student()
        student.name=data.name;
        student.gender = data.gender;
        student.address= data.address;
        student.dob = dob;
        student.mobileNo= data.mobileNo;
        student.age  = age;
        
        const studentRepository = AppDataSource.getRepository(Student);
        
        const newStudent = await studentRepository.save(student);
        if(!newStudent){
            return {message:"Faild to add student !"};
        }
        return {message:"Student added successfully !",data:newStudent};
    }catch(error){
        return {error}
    }
}


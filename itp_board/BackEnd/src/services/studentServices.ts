import {AppDataSource} from "../configs/db.config";
import {Student} from "../models/student";
import {io} from "../utils/app";

const studentRepository = AppDataSource.getRepository(Student)

export const fetchAll=async ()=>{
    return await studentRepository.find();
}

export const create = async(
    name:string,
    gender:string,
    address:string,
    dateOfBirth:string,
    mobileNo:string
)=>{
    const student = new Student()
    student.name = name
    student.gender = gender
    student.address = address
    student.dateOfBirth = new Date(dateOfBirth)
    student.mobileNo = mobileNo

    const response = await studentRepository.save(student);
    if(response){
        io.emit('new_student_added',response);
    }
    return response;
}

export const update =async (id:number,rest:Record<string, string>)=>{
    const response =  await studentRepository.update(
        { id },
        rest
    )
    if (response.affected && response.affected>0) {io.emit('student_edited',id);}
    return response;
}

export const remove = async (id:number)=>{
    const response = await studentRepository.delete({id})
    if (response.affected && response.affected>0) {io.emit('student_deleted',id);}
    return response
}


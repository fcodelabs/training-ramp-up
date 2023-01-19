import { AppDataSource } from '../configs/db.config'
import { Student } from '../models/Student'

const studentRepository = AppDataSource.getRepository(Student)

async function getAllStudents(): Promise<Student[]> {
  return await studentRepository.find()
}

async function createStudent(student: Student): Promise<Student> {
  return await studentRepository.save(student)
}

async function updateStudentById(student: Student) {
  const { id, name, gender, address, dob, mobileNo } = student
  return await studentRepository.update(
    { id },
    {name, gender, address, dob, mobileNo }
  )
}

async function deleteStudentById(id:string){
  return await studentRepository.delete({id})
}




export { createStudent, getAllStudents, updateStudentById, deleteStudentById }


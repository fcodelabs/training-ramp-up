import { AppDataSource } from '../configs/db.config'
import { Student } from '../models/Student'
import { sockets } from '../utils/sockets'

const studentRepository = AppDataSource.getRepository(Student)



async function getAllStudents(): Promise<Student[]> {
  return await studentRepository.find();

}

async function createStudent(student: Student): Promise<Student> {
  const response = await studentRepository.save(student);
  console.log(response);
  if(response){
    sockets.forEach((socket)=>{
      socket.broadcast.emit('new_student_added', response);
    })
  }
  return response;
}

async function updateStudentById(student: Student) {
  const { id, name, gender, address, dateOfBirth, mobileNo } = student
  const response =  await studentRepository.update(
    { id },
    { name, gender, address, dateOfBirth, mobileNo }
  )
  if (response) {
    sockets.forEach(socket => {
      socket.broadcast.emit('student_edited', student)
    })
  }
  return response;
}

async function deleteStudentById(id:number){
  const response = await studentRepository.delete({id})
  if (response) {
    sockets.forEach(socket => {
      socket.broadcast.emit('student_deleted', id)
    })
  }
  return response
}

export {createStudent, getAllStudents, updateStudentById, deleteStudentById }


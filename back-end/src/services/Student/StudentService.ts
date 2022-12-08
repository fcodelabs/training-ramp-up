import Student from '../../entity/Student'
import StudentModel from '../../models/Student/studentModel'
import DatabaseService from '../../services/DatabaseService'

DatabaseService.initialize().then(() => {
  console.log('Data Source has been initialized!')
})
  .catch((err) => {
    console.error('Error during Data Source initialization:', err)
  })

export const getAllStudentsService = async () => {
  const students = await DatabaseService.getRepository(Student).find()
  return students
}

export const addStudentService = async (student: StudentModel) => {
  const newStudent = new Student()
  newStudent.name = student.name
  newStudent.gender = student.gender
  newStudent.address = student.address
  newStudent.mobileNo = student.mobileNo
  newStudent.dob = student.dob
  const result = await DatabaseService.getRepository(Student).save(newStudent)
  return result
}

export const updateStudentService = async (updatestudent: StudentModel) => {
  const studentId = updatestudent.id
  const student = await DatabaseService.getRepository(Student).findOneBy({
    id: studentId
  })
  if (student !== null) {
    DatabaseService.getRepository(Student).merge(student, updatestudent)
    const result = await DatabaseService.getRepository(Student).save(student)
    return result
  }
}

export const deleteStudentService = async (ID: number) => {
  const result = await DatabaseService.getRepository(Student).delete(ID)
  return result
}

import Student from '../entity/student'
import StudentModel, { UpdateStudentModel } from '../models/studentModel'
import DatabaseService from './databaseService'

export const getAllStudentsService = async () => {
  try {
    const students = await DatabaseService.getRepository(Student).find({ order: { id: 'ASC' } })
    return students
  } catch (err) {
    return null
  }
}

export const addStudentService = async (student: StudentModel) => {
  try {
    const newStudent = new Student()
    newStudent.name = student.name
    newStudent.gender = student.gender
    newStudent.address = student.address
    newStudent.mobileNo = student.mobileNo
    newStudent.dob = student.dob
    const result = await DatabaseService.getRepository(Student).save(newStudent)
    return result
  } catch (err) {
    return null
  }
}

export const updateStudentService = async (updatestudent: UpdateStudentModel) => {
  try {
    const studentId = updatestudent.id
    const student = await DatabaseService.getRepository(Student).findOneBy({
      id: studentId
    })
    if (student !== null) {
      const updatedStudent = DatabaseService.getRepository(Student).merge(student, updatestudent)
      const result = await DatabaseService.getRepository(Student).save(updatedStudent)
      return result
    }
    return null
  } catch (err) {
    return null
  }
}

export const deleteStudentService = async (ID: number) => {
  try {
    const result = await DatabaseService.getRepository(Student).delete(ID)
    return result
  } catch (err) {
    return null
  }
}

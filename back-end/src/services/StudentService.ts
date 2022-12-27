import Student from '../entity/Student'
import StudentModel from '../models/studentModel'
import DatabaseService from './DatabaseService'

export const getAllStudentsService = async () => {
  try {
    const students = await DatabaseService.getRepository(Student).find({ order: { id: 'ASC' } })
    return students
  } catch (err) {
    return err
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
    return err
  }
}

export const updateStudentService = async (updatestudent: StudentModel) => {
  try {
    const studentId = updatestudent.id
    const student = await DatabaseService.getRepository(Student).findOneBy({
      id: studentId
    })
    if (student !== null) {
      DatabaseService.getRepository(Student).merge(student, updatestudent)
      const result = await DatabaseService.getRepository(Student).save(student)
      return result
    }
  } catch (err) {
    return err
  }
}

export const deleteStudentService = async (ID: number) => {
  try {
    const result = await DatabaseService.getRepository(Student).delete(ID)
    return result
  } catch (err) {
    return err
  }
}

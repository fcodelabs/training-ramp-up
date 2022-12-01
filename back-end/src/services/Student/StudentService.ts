import Student from '../../models/Student/studentModel'
import students from '../../utils/students'

export const getAllStudentsService = () => {
  return students
}

export const addStudentService = (student: Student) => {
  students.push(student)
  return students
}

export const updateStudentService = (updatestudent: Student) => {
  const temp = students.find(student => student.personID === updatestudent.personID)

  if (temp != null) {
    const index = students.indexOf(temp)
    students[index] = updatestudent
    return students
  }
}

export const deleteStudentService = (ID: number) => {
  const temp = students.find(student => student.personID === ID)
  if (temp != null) {
    const index = students.indexOf(temp)
    students.splice(index, 1)
    return students
  }
}

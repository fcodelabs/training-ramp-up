import axiosPrivate from './client'

interface StudentResponse {
  name: string
  gender: string
  dob: Date
  address: string
  mobile: string
  age: number
}

export async function getStudentsAPI() {
  const response = await axiosPrivate.get('student')
  return response
}

export const addStudentAPI = async (student: StudentResponse) => {
  const response = await axiosPrivate.post('student', student)
  return response
}
export const updateStudentAPI = async (id: number, student: StudentResponse) => {
  return await axiosPrivate.patch(`student/${id}`, student)
}

export const deleteStudentAPI = async (id: number) => {
  return await axiosPrivate.delete(`student/${id}`)
}

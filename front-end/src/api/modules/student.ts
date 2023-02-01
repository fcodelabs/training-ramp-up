import { Student } from '../../utils/interfaces'
import { axiosClient, resolver } from '../client'

interface StudentResponse {
  name: string
  gender: string
  dob: Date
  address: string
  mobile: string
  age: number
}

export default {
  getStudents() {
    return resolver(axiosClient.get('/'))
  },

  postStudent(student: StudentResponse) {
    return resolver(axiosClient.post('/', student))
  },

  putStudent(id: number, student: StudentResponse) {
    return resolver(axiosClient.patch(`/${id}`, student))
  },

  deleteStudent(id: number) {
    return resolver(axiosClient.delete(`/${id}`))
  },
}

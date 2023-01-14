export default interface StudentModel {
  id?: number
  name: string
  gender: string
  address: string
  mobileNo: string
  dob: Date
}

export interface UpdateStudentModel {
  id: number
  name?: string
  gender?: string
  address?: string
  mobileNo?: string
  dob?: Date
}

export interface TestGetAllStudentModel {
  allStudents?: [StudentModel] | null
}
export interface DeleteStudentModel {
  raw: any
  affected: number
}

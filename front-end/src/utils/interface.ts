export default interface Person {
  id: number
  name: string
  gender: string
  address: string
  mobileNo: string
  dob: Date
  inEdit?: boolean
}

export interface UpdatedPerson {
  id: number
  name?: string
  gender?: string
  address?: string
  mobileNo?: string
  dob?: Date | undefined
}

export interface ResponseGenerator {
  config?: any
  data?: any
  headers?: any
  request?: any
  status?: number
  statusText?: string
}

export interface User {
  id?: number
  userName?: string
  email: string
  role?: string
  password?: string
  confirmPassword?: string
}

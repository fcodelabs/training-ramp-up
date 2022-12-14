export default interface Person {
  id: number
  name: string
  gender: string
  address: string
  mobileNo: string
  dob: Date
  inEdit?: boolean
}

export interface ResponseGenerator {
  config?: any
  data?: any
  headers?: any
  request?: any
  status?: number
  statusText?: string
}

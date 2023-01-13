import { AxiosRequestTransformer, AxiosResponseTransformer, Method } from 'axios'

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
  payload?: any
}

export interface User {
  id?: number
  userName: string
  email: string
  role: string
  password?: string
  confirmPassword?: string
}

export interface AxiosRequestConfig {
  url?: string
  method?: Method
  data?: any
  headers?: any
  baseURL?: string
  transformRequest?: AxiosRequestTransformer
  transformResponse?: AxiosResponseTransformer
  params?: any
  paramSerializer?: (params: any) => string
  timeout?: number
  withCredentials?: boolean
}

export interface PropType {
  component: React.FC
}

// export interface ResponseType {
//   data: string
//   status: number
// }
// export interface ErrorType {
//   code: string
//   config: any
//   message: string
//   response: ResponseType
// }

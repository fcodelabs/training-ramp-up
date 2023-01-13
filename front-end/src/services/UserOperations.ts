import axios from 'axios'
import { User } from '../utils/interface'
import axiosInstance from './setupInterceptors'

const baseURL: string = 'http://localhost:8000/user'

export const getAUser = async (user: User) => {
  const response = await axios.post(baseURL + '/signin', user, {
    withCredentials: true
  })
  return response
}

export const insertUser = async (user: User) => {
  const response = await axios.post(baseURL + '/signup', user)
  return response
}

export const logoutUserSession = async () => {
  const response = await axiosInstance.post('/user/signout')
  return response
}

// export const refreshUserToken = async () => {
//   const response = await axios.post(baseURL + '/refresh', { withCredentials: true })
//   return response
// }

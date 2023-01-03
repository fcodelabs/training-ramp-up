import axios from 'axios'
import { User } from '../utils/interface'

const baseURL: string = 'http://localhost:8000'

export const getAUser = async (user: User) => {
  const response = await axios.post(baseURL + '/user/signin', user)
  return response
}

export const insertUser = async (user: User) => {
  const response = await axios.post(baseURL + '/user/signup', user)
  return response
}

export const refreshUserToken = async (email: string, refreshToken: string) => {
  const response = await axios.post(baseURL + '/user/refresh', email, { headers: { authorization: refreshToken } })
  return response
}

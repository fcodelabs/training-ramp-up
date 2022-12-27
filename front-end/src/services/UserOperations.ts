import User from '../utils/interface'
import axios from 'axios'

const baseURL: string = 'http://localhost:8000'

export const getAUser = async (user: User) => {
  const response = await axios.post(baseURL + '/user/signin', user)
  return response
}

export const insertUser = async (user: User) => {
  const response = await axios.post(baseURL + '/user/signup', user)
  return response
}

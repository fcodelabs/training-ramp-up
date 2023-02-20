import { tempResp, User, UserCredetial } from '../utils/types'
import axios from '../config/axiosConf'

export const updateTokens = async () => {
  const response = await axios({
    method: 'post',
    url: '/user/refreshtoken',
    data: {
      refreshToken: localStorage.getItem('refreshToken'),
    },
  })
  const { accessToken, refreshToken } = response.data
  localStorage.setItem('token', accessToken)
  localStorage.setItem('refreshToken', refreshToken)
}
export const checkCredentials = async (credentials: UserCredetial): Promise<tempResp> => {
  const { email, password } = credentials
  const config = {
    method: 'post',
    url: '/auth/login',
    data: {
      email,
      password,
    },
  }
  const response = await axios(config)
  return response.data
}
export const createUserData = async (record: User) => {
  const { email, firstName, lastName, password, admin } = record
  const config = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    url: '/auth/signup',
    data: {
      email,
      firstName,
      lastName,
      password,
      admin,
    },
  }
  const res = await axios(config)
  return res.data
}

export const signOut = async () => {
  await axios({
    method: 'delete',
    url: '/auth/signout',
    withCredentials: true,
  })
}

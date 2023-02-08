import { publicRequest } from '../utils/requestMethods'

export const resisterService = async (newUser: any): Promise<string> => {
  const data = { data: newUser }
  const res = await publicRequest.post('/users/signup', data)
  return res.data
}

export const loginService = async (userCredintials: any): Promise<string> => {
  const data = { data: userCredintials }
  const res = await publicRequest.post('/users/login', data)
  return res.data
}
export const authloginService = async (): Promise<string> => {
  const res = await publicRequest.get('/auth/login/success')
  return res.data
}
export const refreshAccessTokenService = async (): Promise<string> => {
  // eslint-disable-next-line no-useless-catch
  try {
    const res = await publicRequest.get('/users/refresh')
    return res.data
  } catch (err) {
    localStorage.clear()
    throw err
  }
}

export const logoutService = async (user: any): Promise<string> => {
  // eslint-disable-next-line no-useless-catch
  try {
    console.log(user)
    const data = { data: user }
    const res = await publicRequest.post('/users/logout', data)
    return res.data
  } catch (err) {
    throw err
  }
}

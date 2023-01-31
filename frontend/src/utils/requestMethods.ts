import axios from 'axios'
import { refreshAccessTokenService } from '../services/authServices'

const BASE_URL = 'http://localhost:5000/api/'

export const publicRequest = axios.create({
  withCredentials: true,
  baseURL: BASE_URL,
})

const privateRequest = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
})

privateRequest.interceptors.request.use(
  async (config: any) => {
    const accessToken = localStorage.getItem('accessToken')
    if (accessToken != null) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config
  },
  async (error) => await Promise.reject(error),
)

privateRequest.interceptors.response.use(
  (response) => response,
  async (error) => {
    const prevRequest = error?.config
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (error?.response?.status === 403 && !prevRequest?.sent) {
      prevRequest.sent = true
      const newAccessToken = await refreshAccessTokenService()
     
      localStorage.setItem('accessToken', newAccessToken)
      prevRequest.headers.Authorization = `Bearer ${newAccessToken}`
      return await privateRequest(prevRequest)
    }
    return await Promise.reject(error)
  },
)

export default privateRequest

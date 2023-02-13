/* eslint-disable @typescript-eslint/strict-boolean-expressions */
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
    if (accessToken) {
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
      try {
        const newAccessToken = await refreshAccessTokenService()
        localStorage.setItem('accessToken', newAccessToken)
        prevRequest.headers.Authorization = `Bearer ${newAccessToken}`
      } catch (err: any) {
        //console.log(err)
        if (err?.response?.status === 401) localStorage.clear()
      }
      return await privateRequest(prevRequest)
    }
    console.log(error?.response?.status)
    //if (error?.response?.status === 401) localStorage.clear()
    return await Promise.reject(error)
  },
)

export default privateRequest

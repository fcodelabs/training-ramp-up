import axios from 'axios'
import { toast } from 'react-toastify'
import { signOutUser } from '../pages/SignIn/userSlice'
import store from '../store'

const BASE_URL = 'http://localhost:8080/api/'
const REFRESH_URL = 'http://localhost:8080/api/auth/refresh'

const instance = axios.create({
  baseURL: BASE_URL,
})

interface StudentResponse {
  name: string
  gender: string
  dob: Date
  address: string
  mobile: string
  age: number
}

instance.interceptors.request.use(
  async (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: {
    'content-type': 'application/json',
    Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
  },
  withCredentials: true,
})

axiosPrivate.interceptors.response.use(
  async (response) => {
    return response
  },
  async (error) => {
    const originalRequest = error.config
    if (error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true
      try {
        const { data } = await axiosPrivate.get('user/refresh', {
          withCredentials: true,
        })

        sessionStorage.setItem('accessToken', data.accessToken)
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + data.accessToken
        originalRequest.headers['Authorization'] = 'Bearer ' + data.accessToken
        return await axiosPrivate(originalRequest)
      } catch (err: any) {
        if (err.response.status === 401) {
          store.dispatch(signOutUser())
        }
        return Promise.reject(err)
      }
    }
    return Promise.reject(error)
  },
)

export async function getStudentsAPI() {
  const response = await axiosPrivate.get('student/')
  return response
}

export const addStudentAPI = async (student: StudentResponse) => {
  const response = await axiosPrivate.post('student/', student)
  return response
}
export const updateStudentAPI = async (id: number, student: StudentResponse) => {
  return await axiosPrivate.patch(`student/${id}`, student)
}

export const deleteStudentAPI = async (id: number) => {
  return await axiosPrivate.delete(`student/${id}`)
}

export default instance

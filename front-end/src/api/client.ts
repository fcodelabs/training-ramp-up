import axios from 'axios'
import { toast } from 'react-toastify'
import { signOutUser } from '../pages/SignIn/userSlice'
import store from '../store'

const BASE_URL = 'http://localhost:8080/'
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

// instance.interceptors.request.use(
//   async (config) => {
//     return config
//   },
//   (error) => {
//     return Promise.reject(error)
//   },
// )

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
    console.log(response)
    return response
  },
  async (error) => {
    console.log(error)
    const originalRequest = error.config
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      try {
        const { data } = await axiosPrivate.get('auth/refresh', {
          withCredentials: true,
        })
        console.log(data)
        sessionStorage.setItem('accessToken', data.accessToken)
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + data.accessToken
        originalRequest.headers['Authorization'] = 'Bearer ' + data.accessToken
        return await axiosPrivate(originalRequest)
      } catch (err: any) {
        if (err.response.status === 403) {
          store.dispatch(signOutUser())
        }
        return Promise.reject(err)
      }
    }
    return Promise.reject(error)
  },
)

export async function getStudentsAPI() {
  return axiosPrivate.get('students')
}

export const addStudentAPI = async (student: StudentResponse) => {
  const response = await axiosPrivate.post('students', student)
  return response
}
export const updateStudentAPI = async (id: number, student: StudentResponse) => {
  return await axiosPrivate.patch(`students/${id}`, student)
}

export const deleteStudentAPI = async (id: number) => {
  return await axiosPrivate.delete(`students/${id}`)
}

export default instance

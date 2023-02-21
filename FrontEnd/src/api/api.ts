import axios from 'axios'
import { User, UserSignIn, UserSignUp } from '../interfaces/interfaces'
import store from '../../src/store'
import { signOutUser } from '../pages/SignIn/authSlice'
import { toast } from 'react-toastify'

export const client = axios.create({
  baseURL: 'http://localhost:3002/',
})

export const axiosPrivate = axios.create({
  baseURL: 'http://localhost:3002/',
  // headers: {
  //   'content-type': 'application/json',
  //   Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
  // },
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
        const { data } = await axiosPrivate.get('/refresh', {
          withCredentials: true,
        })
        sessionStorage.setItem('accessToken', data)
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + data
        originalRequest.headers['Authorization'] = 'Bearer ' + data
        return await axiosPrivate(originalRequest)
      } catch (err: any) {
        if (err.response.status === 401) {
          store.dispatch(signOutUser())
          toast.info('Session expired, please login again')
        }
        return Promise.reject(err)
      }
    }
    return Promise.reject(error)
  },
)

export const getUsers = () => {
  const headers =  {
    'content-type': 'application/json',
    Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
  }
  return axiosPrivate.get('home/', {headers})
}

export async function addUserr(user: User) {
  try {
    const headers =  {
      'content-type': 'application/json',
      Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
    }
    const response = await axiosPrivate.post('home/', user, {headers})
    return response
  } catch (error) {
    console.error('error', error)
  }
}

export async function updateUser(user: any) {
  try {
    const headers =  {
      'content-type': 'application/json',
      Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
    }
    const response = await axiosPrivate.patch(`home/${user.id}`, user, {headers})
    return response
  } catch (error) {
    console.error('error', error)
  }
}

export const deleteUser = (id: any) => {
  const headers =  {
    'content-type': 'application/json',
    Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
  }
  axiosPrivate
    .delete(`home/${id}`, {headers})
    .then((response) => {
      console.log('response', response.data)
    })
    .catch((error) => {
      console.error('error', error)
    })
}

export async function signUpUserAPI(user: UserSignUp) {
  try {
    const response = await client.post('signup/', user)
    return response
  } catch (error) {
    console.error('error', error)
  }
}

export async function signInUserAPI(user: UserSignIn) {
  try {
    const response = await client.post('/', user, {
      withCredentials: true,
    })
    return response
  } catch (error) {
    console.error('error', error)
    return error
  }
}

export async function logout() {
  try {
    const response = await client.get('/logout', {
      withCredentials: true,
    })
    return response
  } catch (error) {
    console.error(error)
    return error
  }
}

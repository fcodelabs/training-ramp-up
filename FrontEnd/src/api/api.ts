import axios from 'axios'
import { User, UserSignIn, UserSignUp } from '../interfaces/interfaces'
// import useAxiosPrivate from '../hooks/useAxiosPrivate'

export const client = axios.create({
  baseURL: 'http://localhost:3001/',
})

export const axiosPrivate = axios.create({
  baseURL: 'http://localhost:3001/',
  headers: {
    'content-type': 'application/json',
    Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
  },
  withCredentials: true,
})

// const axiosPrivatehook = useAxiosPrivate()

export const getUsers = () => {
  return axiosPrivate.get('home/')
}

export async function addUserr(user: User) {
  try {
    const response = await client.post('home/', user)
    return response
  } catch (error) {
    console.error('error', error)
  }
}

export async function updateUser(user: any) {
  try {
    const response = await client.put(`home/${user.id}`, user)
    return response
  } catch (error) {
    console.error('error', error)
  }
}

export const deleteUser = (id: any) => {
  client
    .delete(`home/${id}`)
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
    console.log('response', response)
    return response
  } catch (error) {
    console.error('error', error)
  }
}

export async function signInUserAPI(user: UserSignIn) {
  try {
    const response = await client.post('/', user, 
    {
      withCredentials: true,
    })
    console.log('response', response)
    sessionStorage.setItem('accessToken', response.data.accessToken)
    return response
  } catch (error) {
    console.error('error', error)
    return error
  }
}
import axios from 'axios'
import { User, UserSignIn, UserSignUp } from '../interfaces/interfaces'

const client = axios.create({
  baseURL: 'http://localhost:3001/',
})

export const getUsers = () => {
  return client.get('home/')
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
    const response = await client.post('/', user)
    console.log('response', response)
    return response
  } catch (error) {
    console.error('error', error)
    return error
  }
}
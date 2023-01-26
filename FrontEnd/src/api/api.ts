import axios from 'axios';
import { User } from '../interfaces/interfaces';

const client = axios.create({
    baseURL: 'http://localhost:3001/home',
  })

export const getUsers = () => {
    return client.get('/')
}

export async function addUserr(user: User) {
  try{
  const response = await client.post('/', user)
  return response
  } catch (error) {
    console.log('error', error)
  }
}

export async function updateUser(user: any){
  try{
  const response = await client.put(`/${user.id}`, user)
  return response
  } catch (error) {
    console.log('error', error)
  }
}

export const deleteUser = (id: any) => {
  client.delete(`/${id}`).then((response) => {
    console.log('response', response.data)
    
  }).catch((error) => {
    console.log('error', error)
  })
}
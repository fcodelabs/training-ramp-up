import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { User } from '../interfaces/interfaces'
import {sampleProducts} from '../products'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios';
import * as io from 'socket.io-client'

// eslint-disable-next-line prefer-const
let data = [...sampleProducts]
// eslint-disable-next-line prefer-const
let validations: string[] = []
// const [validations, setValidations] = useState<string[]>([]);

export const socket = io.connect('http://localhost:3001')

const client = axios.create({
  baseURL: 'http://localhost:3001/home' 
});


const isEmpty = (item: any) => {
  if (!item.username || !item.address || !item.mobile || !item.dob) {
    validations.push('Please input all fields!')
    return true
  }
  return false
}

const isUsernameInvalid = (item: string) => {
  const reg = new RegExp('^[a-z A-Z]+$')
  if (!item || !reg.test(item)) {
    console.log('line 23 ', reg.test(item))
    validations.push('Please provide a valid Name')
    return true
  }
  return false
}

const isMobileInvalid = (item: string) => {
  const reg = new RegExp('^[0-9+ ]+$')
  if (!item || !reg.test(item) || item.length < 10) {
    validations.push('Please provide a valid Mobile No.')
    return true
  }
  return false
}

export const validationFunc = (arr: any) => {
  console.log('is empty function :', isEmpty(arr))
  if (isEmpty(arr)) {
    toast.error('Please input all fields!')
    return false
  }
  if (isUsernameInvalid(arr.username)) {
    toast.error('Please provide a valid Name')
    return false
  }
  if (isMobileInvalid(arr.mobile)) {
    toast.error('Please provide a valid Mobile No.')
    return false
  }
  return true
}

const calculateAge = (dob: string) => {
  // eslint-disable-next-line no-var
  const today = new Date()
  // eslint-disable-next-line no-var
  const birthDate = new Date(dob)
  let ageNow = today.getFullYear() - birthDate.getFullYear()
  const m = today.getMonth() - birthDate.getMonth()
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    ageNow--
  }
  return ageNow
}
const generateId = (data: any[]) =>
  data.reduce((acc, current) => Math.max(acc, current.userId), 0) + 1

export const insertItem = (item: any) => {
  if (validationFunc(item)) {
    item.userId = generateId(data)
    item.inEdit = false
    item.age = calculateAge(item.dob)
    data.unshift(item)
    
    socket.emit('user_added', { username : item.username})
    toast.success('User added successfully!')

    return data
  }
}

export const getItems = () => {
  socket.emit('send_message', { message: 'hello'})
//   client.get('/').then((response) => {
//     console.log('response', response.data);
//     return response.data
//  });
  return data
    // const response = await client.get('/')
    // return response.data
}
export const updateItem = (item: any) => {
  const index = data.findIndex((record) => record.userId === item.userId)
    item.age = calculateAge(item.dob)
    socket.emit('user_updated', { username : item.username})
    data[index] = item

    toast.success('User Updated Successfully!')
  return data
}
export const deleteItem = (item: any) => {
  const index = data.findIndex((record) => record.userId === item.userId)
  socket.emit('user_removed', { username : item.username})
  data.splice(index, 1)
  return data
}

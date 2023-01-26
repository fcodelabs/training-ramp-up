import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { User } from '../interfaces/interfaces'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'
import * as io from 'socket.io-client'

// eslint-disable-next-line prefer-const
// let data = [...sampleProducts]
// eslint-disable-next-line prefer-const
let validations: string[] = []
// const [validations, setValidations] = useState<string[]>([]);

export const socket = io.connect('http://localhost:3001')

const client = axios.create({
  baseURL: 'http://localhost:3001/home',
})

const isEmpty = (item: any) => {
  if (!item.name || !item.address || !item.mobile || !item.dob) {
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
  if (isUsernameInvalid(arr.name)) {
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
const generateId = (data: any[]) => data.reduce((acc, current) => Math.max(acc, current.id), 0) + 1

export const modifyAdd = (item: any) => {
  item.inEdit = false
  item.age = calculateAge(item.dob)

  // delete item.inEdit

  if (!item.gender) {
    // add gender as male if new user is not a female
    item.gender = 'male'
  }

  // post request for adding data to the database
  // client.post('http://localhost:3001/home/', item).then((response) => {
  //   console.log('response', response.data)
  // }).catch((error) => {
  //   console.log('error', error)
  // })

  // data.unshift(item)

  // socket.emit('user_added', { name: item.name })
  // toast.success('User added successfully!')

  return item
}

// export const getItems = async () => {
//   client.get('/').then((response) => {
//     console.log('response', response.data);
//     return response.data
//  });
// return data

// const response = await client.get('/')
// // console.log('response dob',new Date(response.data[0].dob) )
// const responceData = response.data.map((item: any) => {
//   item.dob = new Date(item.dob)
//   return item
// })
// return responceData
// }

export const modifyUpdate = (item: any) => {
  // const index = data.findIndex((record) => record.id === item.id)
  item.age = calculateAge(item.dob)
  socket.emit('user_updated', { name: item.name })
  // data[index] = item
  item.inEdit = false

  // client
  //   .put(`/${item.id}`, item)
  //   .then((response) => {
  //     console.log('response', response.data)
  //   })
  //   .catch((error) => {
  //     console.log('error', error)
  //   })

  toast.success('User Updated Successfully!')
  return item
}
// export const deleteItem = (item: any) => {
//   // const index = data.findIndex((record) => record.id === item.id)
//   socket.emit('user_removed', { name: item.name })
//   // data.splice(index, 1)
//   client
//     .delete(`/${item.id}`, item)
//     .then((response) => {
//       console.log('response', response.data)
//     })
//     .catch((error) => {
//       console.log('error', error)
//     })
//   return data
// }

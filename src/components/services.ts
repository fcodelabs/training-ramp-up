import { sampleData } from './sample-data'
import { toast } from 'react-toastify'
import { User } from './interface'

const data = [...sampleData]

const generateId = (data: User[]) =>
  data.reduce((acc: number, current: { ID: number }) => Math.max(acc, current.ID), 0) + 1

const calcAge = (date: Date) => {
  const today = new Date()
  const birthDate = new Date(date)
  let age = today.getFullYear() - birthDate.getFullYear()
  const m = today.getMonth() - birthDate.getMonth()
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--
  }
  if (age >= 18) {
    return age
  } else {
    toast.error('Age must be greater than or equal to 18')
    return age
  }
}

const isPhonenumber = (number: string) => {
  const phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
  if (number.match(phoneno)) {
    return true
  } else {
    toast.error('Please enter valid phone number')
    return false
  }
}

const isAddress = (address: string) => {
  const adrs = /^[a-zA-Z0-9\s,'.-]*$/
  if (address.match(adrs)) {
    return true
  } else {
    toast.error('Please enter valid address')
    return false
  }
}

export const insertItem = (item: User) => {
  if (item.Name && item.DOB && item.Gender && item.Address && item.Mobile) {
    const Age = calcAge(item.DOB)
    if (isAddress(item.Address) && isPhonenumber(item.Mobile) && Age >= 18) {
      item.ID = generateId(data)
      item.inEdit = false
      item.Age = Age
      item.DOB = new Date(item.DOB)
      data.unshift(item)
      return data
    } else {
      return data
    }
  } else {
    toast.error('Please fill all the fields')
    return data
  }
}

export const getItems = () => {
  return data
}

export const updateItem = (item: User) => {
  if (item.Name && item.DOB && item.Gender && item.Address && item.Mobile) {
    const Age = calcAge(item.DOB)
    if (isAddress(item.Address) && isPhonenumber(item.Mobile) && Age >= 18) {
      const index = data.findIndex((record) => record.ID === item.ID)
      data[index] = {
        ID: item.ID,
        Name: item.Name,
        DOB: item.DOB,
        Gender: item.Gender,
        Address: item.Address,
        Mobile: item.Mobile,
        Age: Age,
      }
      item.inEdit = false
      return data
    } else {
      return data
    }
  } else {
    toast.error('Please fill all the fields')
    return data
  }
}

export const deleteItem = (item: User) => {
  const index = data.findIndex((record) => record.ID === item.ID)
  data.splice(index, 1)
  return data
}

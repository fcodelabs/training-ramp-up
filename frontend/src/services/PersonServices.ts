import { Person } from '../models/interface'
import privateRequest, { publicRequest } from '../utils/requestMethods'

export const addNewPersonService = async (dataArr: [Person, number]): Promise<Person | unknown> => {
  const personData = dataArr[0]

  const config = {
    data: personData,
  }
  const res = await privateRequest.post(`/students`, config)
  console.log(res.data)
  return res.data
}

export const updatePersonService = async (updateValue: Person): Promise<Person | unknown> => {
  const config = {
    data: updateValue,
  }
  const res = await privateRequest.patch(`/students`, config)
  console.log(res.data)
  return res.data
}

export const deletePersonService = async (Id: number): Promise<Person | unknown> => {
  console.log('asd')
  const res = await privateRequest.delete(`/students/${Id}`)

  return res.data
}

// get project

export const getAllPersonServise = async (personData: any): Promise<Person[] | unknown> => {
  if (personData.Provider === 'local') {
    const res = await privateRequest.get('/students')
    return res.data
  } else {
    const res = await publicRequest.get('students/auth')
    return res.data
  }
}

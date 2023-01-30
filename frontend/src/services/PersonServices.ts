import { Person } from '../models/interface'
import privateRequest, { publicRequest } from '../utils/requestMethods'




export const addNewPersonService = async (dataArr: [Person, number]): Promise<Person | unknown> => {
  try {
    const personData = dataArr[0]
    personData.PersonID = dataArr[1]
    const config = {
      data: personData,
    }
    const res = await publicRequest.post(`/students`, config)
    console.log(res.data)
    return res.data
  } catch (err) {
    return err
  }
}

export const updatePersonService = async (updateValue: Person): Promise<Person | unknown> => {
 
  try {
    const config = {
      data: updateValue,
    }
    const res = await publicRequest.put(`/students`, config)
    console.log(res.data)
    return res.data
  } catch (err) {
    return err
  }
}

export const deletePersonService = async (Id: number): Promise<Person | unknown> => {
 
  try {
    console.log('asd')
    const res = await publicRequest.delete(`/students/${Id}`)

    return res.data
  } catch (err) {
    return err
  }
}

// get project

export const getAllPersonServise = async (): Promise<Person[] | unknown> => {
  try {
    const res = await privateRequest.get('/students')
    return res.data
  } catch (err) {
    return err
  }
}

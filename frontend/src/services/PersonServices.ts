import { Person } from '../helpers/interface'
import { publicRequest } from '../utils/requestMethods'

export const addNewPersonService = async (dataArr: [Person, number]): Promise<Person | unknown> => {
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  try {
    const personData = dataArr[0]
    personData.PersonID = dataArr[1]
    const config = {
      data: personData,
    }
    const res = await publicRequest.post(`/users`, config)
    console.log(res.data)
    return res.data
  } catch (err) {
    return err
  }
}

export const updatePersonService = async (updateValue: Person): Promise<Person | unknown> => {
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  try {
    const config = {
      data: updateValue,
    }
    const res = await publicRequest.put(`/users`, config)
    console.log(res.data)
    return res.data
  } catch (err) {
    return err
  }
}

export const deletePersonService = async (Id: number): Promise<Person | unknown> => {
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  try {
    console.log("asd")
    const res = await publicRequest.delete(`/users/${Id}`)

    return res.data
  } catch (err) {
    return err
  }
}

// get project
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const getAllPersonServise = async (): Promise<Person[] | unknown> => {
  try {
    const res = await publicRequest.get('/users')
    return res.data
  } catch (err) {
    return err
  }
}

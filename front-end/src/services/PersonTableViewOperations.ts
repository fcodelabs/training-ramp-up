import Person from '../utils/interface'
import axiosInstance from './setupInterceptors'

const baseURL = '/student'

export const getPersons = async () => {
  const response = await axiosInstance.get(baseURL + '/get')
  // eslint-disable-next-line no-return-assign
  response.data.map((person: Person) => (person.dob = new Date(person.dob)))
  return response
}

export const insertPerson = async (person: Person) => {
  person.inEdit = false
  const response = await axiosInstance.post(baseURL + '/add', person)
  return response
}

export const updatePerson = async (person: Person) => {
  person.inEdit = false
  const response = await axiosInstance.patch(baseURL + '/update', person)
  return response
}

export const deletePerson = async (person: Person) => {
  const response = await axiosInstance.delete(baseURL + `/delete/${person.id}`)
  return response
}

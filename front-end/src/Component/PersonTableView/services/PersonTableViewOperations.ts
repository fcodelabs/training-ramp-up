import Person from '../../../utils/interface'
import axios from 'axios'

const baseURL: string = 'http://localhost:8000'

export const getPersons = async () => {
  const response = await axios.get(baseURL + '/student')
  // eslint-disable-next-line no-return-assign
  response.data.map((person: Person) => person.dob = new Date(person.dob))
  return response.data
}

export const insertPerson = async (person: Person) => {
  person.inEdit = false
  const response = await axios.post(baseURL + '/student',
    person
  )
  return response
}

export const updatePerson = async (person: Person) => {
  person.inEdit = false
  const response = await axios.patch(
    baseURL + '/student',
    person
  )
  return response
}

export const deletePerson = async (person: Person) => {
  const response = axios.delete(
    baseURL + `/student/${person.id}`
  )
  return await response
}

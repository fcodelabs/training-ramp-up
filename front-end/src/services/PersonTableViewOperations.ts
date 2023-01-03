import Person from '../utils/interface'
import axios from 'axios'

const baseURL: string = 'http://localhost:8000'

export const getPersons = async (accessToken: string) => {
  const response = await axios.get(baseURL + '/student', {
    headers: { Authorization: accessToken }
  })
  // eslint-disable-next-line no-return-assign
  response.data.map((person: Person) => (person.dob = new Date(person.dob)))
  return response.data
}

export const insertPerson = async (person: Person, accessToken: string) => {
  person.inEdit = false
  const response = await axios.post(baseURL + '/student', person, {
    headers: { Authorization: accessToken }
  })
  return response
}

export const updatePerson = async (person: Person, accessToken: string) => {
  person.inEdit = false
  const response = await axios.patch(baseURL + '/student', person, {
    headers: { Authorization: accessToken }
  })
  return response
}

export const deletePerson = async (person: Person, accessToken: string) => {
  const response = axios.delete(baseURL + `/student/${person.id}`, {
    headers: { Authorization: accessToken }
  })
  return await response
}

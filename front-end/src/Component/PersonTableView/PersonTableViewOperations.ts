import Person from '../../utils/interface'
import persons from '../../utils/persons'

const generateId = (data: Person[]): number =>
  data.reduce((acc, current) => Math.max(acc, current.personID), 0) + 1

export const getPersons = (): Person[] => {
  return persons
}

export const insertPerson = (person: Person): Person[] => {
  person.personID = generateId(persons)
  person.inEdit = false
  persons.push(person)
  return persons
}

export const updatePerson = (person: Person): Person[] => {
  person.inEdit = false
  const index: number = persons.findIndex(
    (record) => record.personID === person.personID
  )
  persons[index] = person
  return persons
}

export const deleteItem = (person: Person): Person[] => {
  const index = persons.findIndex(
    (record) => record.personID === person.personID
  )
  persons.splice(index, 1)
  return persons
}

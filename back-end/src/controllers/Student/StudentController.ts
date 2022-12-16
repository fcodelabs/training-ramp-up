import { Request, Response } from 'express'
import { io } from '../../..'
import StudentModel from '../../models/Student/studentModel'
import {
  getAllStudentsService,
  addStudentService,
  updateStudentService,
  deleteStudentService
} from '../../services/Student/StudentService'

const validateUpdate = (person: StudentModel) => {
  const name = /^([A-z\s.]{3,20})$/

  const address = /^([A-z0-9/,\s]{5,})$/

  const mobileNo = /^([0][0-9]{9})$/

  const age: number = Math.round((new Date().getTime() - new Date(person.dob).getTime()) / (1000 * 60 * 60 * 24 * 365))
  const validateAge: boolean = age >= 18

  if (person.name !== undefined && !name.test(person.name)) {
    return false
  }
  if (person.gender !== undefined && person.gender === '') {
    return false
  }
  if (person.address !== undefined && !address.test(person.address)) {
    return false
  }
  if (person.mobileNo !== undefined && !mobileNo.test(person.mobileNo)) {
    return false
  }
  if (person.dob !== undefined && !validateAge) {
    return false
  }
  return true
}

const validateInsert = (person: StudentModel) => {
  const name = /^([A-z\s.]{3,20})$/

  const address = /^([A-z0-9/,\s]{5,})$/

  const mobileNo = /^([0][0-9]{9})$/

  const age: number = Math.round((new Date().getTime() - new Date(person.dob).getTime()) / (1000 * 60 * 60 * 24 * 365))
  const validateAge: boolean = age >= 18

  if (!name.test(person.name)) {
    return false
  }
  if (person.gender === '') {
    return false
  }
  if (!address.test(person.address)) {
    return false
  }
  if (!mobileNo.test(person.mobileNo)) {
    return false
  }
  if (person.dob == null || !validateAge) {
    return false
  }
  return true
}

export const getAllStudents = async (req: Request, res: Response) => {
  try {
    const students = await getAllStudentsService()
    res.status(200).send(students)
  } catch (err) {
    res.send(`Error: ${err}`)
  }
}

export const addStudent = async (req: Request, res: Response) => {
  try {
    if (validateInsert(req.body)) {
      const result = await addStudentService(req.body)
      res.status(201).send(result)
      io.emit(
        'notification',
        'Student has been added'
      )
    } else {
      res.send('Can not add student. Enter Valid Data')
    }
  } catch (err) {
    res.send(`Error: ${err}`)
  }
}

export const updateStudent = async (req: Request, res: Response) => {
  try {
    if (validateUpdate(req.body)) {
      const result = await updateStudentService(req.body)
      res.status(200).send(result)
      io.emit(
        'notification',
        'Student has been updated'
      )
    } else {
      res.send('Can not update student. Enter Valid Data')
    }
  } catch (err) {
    res.send(`Error: ${err}`)
  }
}

export const deleteStudent = async (req: Request, res: Response) => {
  try {
    const studentId = parseInt(req.params.Id)
    const result = await deleteStudentService(studentId)
    res.status(200).send(result)
    io.emit(
      'notification',
      'Student has been deleted'
    )
  } catch (err) {
    res.send(`Error: ${err}`)
  }
}

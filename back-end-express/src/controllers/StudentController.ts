import { Request, Response } from 'express'
import { io } from '../../server'
import StudentModel, { DeleteStudentModel } from '../models/studentModel'
import {
  getAllStudentsService,
  addStudentService,
  updateStudentService,
  deleteStudentService
} from '../services/StudentService'

const validate = (person: StudentModel) => {
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

export const getAllStudents = async (req: Request, res: Response) => {
  try {
    const students = await getAllStudentsService()
    if (students !== null) {
      res.status(200).send(students)
    } else {
      res.status(400).send('Could not get student details')
    }
  } catch (err) {
    res.status(400).send(`Error: ${err}`)
  }
}

export const addStudent = async (req: Request, res: Response) => {
  try {
    const valid = validate(req.body)
    if (valid) {
      const result = await addStudentService(req.body)
      if (result !== null) {
        res.status(201).send(result)
        io.emit(
          'notification',
          'Student has been added'
        )
      }
    } else {
      res.status(400).send('Can not add student. Enter Valid Data')
    }
  } catch (err) {
    res.status(400).send(`Error: ${err}`)
  }
}

export const updateStudent = async (req: Request, res: Response) => {
  try {
    if (validate(req.body)) {
      const result = await updateStudentService(req.body)
      if (result !== null) {
        res.status(200).send(result)
        io.emit(
          'notification',
          'Student has been updated'
        )
      }
    } else {
      res.status(400).send('Can not update student. Enter Valid Data')
    }
  } catch (err) {
    res.status(400).send(`Error: ${err}`)
  }
}

export const deleteStudent = async (req: Request, res: Response) => {
  try {
    const studentId = parseInt(req.params.Id)
    const result = await deleteStudentService(studentId) as DeleteStudentModel
    if (result.affected !== 0) {
      res.status(200).send(result)
      io.emit(
        'notification',
        'Student has been deleted'
      )
    } else {
      res.status(400).send('Could not found student to delete')
    }
  } catch (err) {
    res.status(400).send(`Error: ${err}`)
  }
}

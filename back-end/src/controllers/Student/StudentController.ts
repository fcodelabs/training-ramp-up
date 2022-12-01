import { Request, Response } from 'express'
import {
  getAllStudentsService,
  addStudentService,
  updateStudentService,
  deleteStudentService
} from '../../services/Student/StudentService'

export const getAllStudents = async (req: Request, res: Response) => {
  try {
    const students = getAllStudentsService()
    res.send(students)
  } catch (err) {
    res.send(`Error: ${err}`)
  }
}

export const addStudent = async (req: Request, res: Response) => {
  try {
    const response = addStudentService(req.body)
    res.send(response)
  } catch (err) {
    res.send(`Error: ${err}`)
  }
}

export const updateStudent = async (req: Request, res: Response) => {
  try {
    const response = updateStudentService(req.body)
    res.send(response)
  } catch (err) {
    res.send(`Error: ${err}`)
  }
}

export const deleteStudent = async (req: Request, res: Response) => {
  try {
    const studentId = parseInt(req.params.Id)
    const response = deleteStudentService(studentId)
    res.send(response)
  } catch (err) {
    res.send(`Error: ${err}`)
  }
}

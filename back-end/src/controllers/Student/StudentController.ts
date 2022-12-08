import { Request, Response } from 'express'
import {
  getAllStudentsService,
  addStudentService,
  updateStudentService,
  deleteStudentService
} from '../../services/Student/StudentService'

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
    const result = await addStudentService(req.body)
    res.status(201).send(result)
  } catch (err) {
    res.send(`Error: ${err}`)
  }
}

export const updateStudent = async (req: Request, res: Response) => {
  try {
    const result = await updateStudentService(req.body)
    res.status(200).send(result)
  } catch (err) {
    res.send(`Error: ${err}`)
  }
}

export const deleteStudent = async (req: Request, res: Response) => {
  try {
    const studentId = parseInt(req.params.Id)
    const result = await deleteStudentService(studentId)
    res.status(200).send(result)
  } catch (err) {
    res.send(`Error: ${err}`)
  }
}

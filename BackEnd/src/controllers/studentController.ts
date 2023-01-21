import { Request, Response } from 'express'
import { addNewStudent, deleteSelectedStudent, getStudents, updateSelectedStudent,  } from '../services/studentServices'

export function getAllStudents(req: Request, res: Response) {
  getStudents(req, res)
}

export function addStudent(req: Request, res: Response) {
  addNewStudent(req,res)
}

export function updateStudent(req: Request, res: Response) {
   updateSelectedStudent(req, res)
}

export function deleteStudent(req: Request, res: Response) {
    deleteSelectedStudent(req, res)
}

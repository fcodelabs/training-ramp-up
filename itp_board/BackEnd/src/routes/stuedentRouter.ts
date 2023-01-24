import express, { Request, Response } from 'express'
import { Student } from '../models/Student'
import { createStudent, getAllStudents, updateStudentById, deleteStudentById } from '../controllers/studentController'

const studentRouter:express.Router = express.Router()

studentRouter.get('/', async(req: Request, res: Response) => {
  const students = await getAllStudents();
  res.send(students);
})




studentRouter.post('/', async (req: Request, res: Response) => {
  const { id, name, gender, address, dateOfBirth, mobileNo } = req.body
  const student = new Student()
  student.id = id
  student.name = name
  student.gender = gender
  student.address = address
  student.dateOfBirth = new Date(dateOfBirth)
  student.mobileNo = mobileNo
  const response = await createStudent(student);
  res.send(response);
})


studentRouter.put('/', async (req: Request, res: Response) => {
  const student:Student = req.body
  const response = await updateStudentById(student);
  res.send(response);
})


studentRouter.delete('/:id',async (req: Request, res: Response) => {
  const id = req.params.id
  const response = await deleteStudentById(parseInt(id));
  res.send(response);
})

export default studentRouter

import express from 'express'
import { createStudent, getAllStudents, updateStudentById, deleteStudentById } from '../controllers/studentController'

const studentRouter:express.Router = express.Router()

studentRouter.get('/', getAllStudents);
studentRouter.post('/', createStudent);
studentRouter.put('/', updateStudentById)
studentRouter.delete('/:id',deleteStudentById)

export default studentRouter

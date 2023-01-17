import express from 'express'
import {
  getAllStudents,
  addStudent,
  updateStudent,
  deleteStudent
} from '../controllers/StudentController'
import { authService } from '../services/AuthService'

const studentRoutes = express.Router()

studentRoutes.get('/', authService(['Admin', 'Guest']), getAllStudents)
studentRoutes.post('/', authService(['Admin']), addStudent)
studentRoutes.patch('/', authService(['Admin']), updateStudent)
studentRoutes.delete('/:Id', authService(['Admin']), deleteStudent)

export default studentRoutes

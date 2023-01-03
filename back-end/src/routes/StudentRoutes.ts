import express from 'express'
import {
  getAllStudents,
  addStudent,
  updateStudent,
  deleteStudent
} from '../controllers/StudentController'
import { authService } from '../services/AuthService'

const StudentRoute = express.Router()

StudentRoute.get('/', authService, getAllStudents)
StudentRoute.post('/', authService, addStudent)
StudentRoute.patch('/', authService, updateStudent)
StudentRoute.delete('/:Id', authService, deleteStudent)

export default StudentRoute

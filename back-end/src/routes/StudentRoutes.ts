import express from 'express'
import {
  getAllStudents,
  addStudent,
  updateStudent,
  deleteStudent
} from '../controllers/StudentController'
import { authService } from '../services/AuthService'

const StudentRoutes = express.Router()

StudentRoutes.get('/get', authService(['Admin', 'Guest']), getAllStudents)
StudentRoutes.post('/add', authService(['Admin']), addStudent)
StudentRoutes.patch('/update', authService(['Admin']), updateStudent)
StudentRoutes.delete('/delete/:Id', authService(['Admin']), deleteStudent)

export default StudentRoutes

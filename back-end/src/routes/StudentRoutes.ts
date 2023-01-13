import express from 'express'
import {
  getAllStudents,
  addStudent,
  updateStudent,
  deleteStudent
} from '../controllers/studentController'
import { authService } from '../services/authService'

const studentRoutes = express.Router()

studentRoutes.get('/get', authService(['Admin', 'Guest']), getAllStudents)
studentRoutes.post('/add', authService(['Admin']), addStudent)
studentRoutes.patch('/update', authService(['Admin']), updateStudent)
studentRoutes.delete('/delete/:Id', authService(['Admin']), deleteStudent)

// studentRoutes.get('/get', getAllStudents)
// studentRoutes.post('/add', addStudent)
// studentRoutes.patch('/update', updateStudent)
// studentRoutes.delete('/delete/:Id', deleteStudent)

export default studentRoutes

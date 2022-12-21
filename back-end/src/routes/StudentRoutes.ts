import express from 'express'
import {
  getAllStudents,
  addStudent,
  updateStudent,
  deleteStudent
} from '../controllers/StudentController'

const StudentRoute = express.Router()

StudentRoute.get('/', getAllStudents)
StudentRoute.post('/', addStudent)
StudentRoute.patch('/', updateStudent)
StudentRoute.delete('/:Id', deleteStudent)

export default StudentRoute

import express from 'express'
import {
  getAllStudents,
  addStudent,
  updateStudent,
  deleteStudent
} from '../../controllers/Student/StudentController'

const StudentRoute = express.Router()
StudentRoute.get('/', getAllStudents)
StudentRoute.post('/', addStudent)
StudentRoute.put('/:Id', updateStudent)
StudentRoute.delete('/:Id', deleteStudent)

export default StudentRoute

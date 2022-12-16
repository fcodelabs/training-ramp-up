import express from 'express'
// import * as cors from 'cors'
import {
  getAllStudents,
  addStudent,
  updateStudent,
  deleteStudent
} from '../../controllers/Student/StudentController'

const StudentRoute = express.Router()

StudentRoute.get('/', getAllStudents)
StudentRoute.post('/', addStudent)
StudentRoute.patch('/', updateStudent)
StudentRoute.delete('/:Id', deleteStudent)

export default StudentRoute

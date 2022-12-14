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
StudentRoute.put('/', updateStudent)
StudentRoute.delete('/:Id', deleteStudent)

// StudentRoute.options('*', cors(options))

export default StudentRoute

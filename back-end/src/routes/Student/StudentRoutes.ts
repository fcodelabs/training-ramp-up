import express from 'express'
// import * as cors from 'cors'
import {
  getAllStudents,
  addStudent,
  updateStudent,
  deleteStudent
} from '../../controllers/Student/StudentController'

const StudentRoute = express.Router()

// const options: cors.CorsOptions = {
//   allowedHeaders: [
//     'Origin',
//     'X-Requested-With',
//     'Content-Type',
//     'Accept',
//     'X-Access-Token'
//   ],
//   credentials: true,
//   methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
//   origin: 'http://localhost:3000',
//   preflightContinue: false
// }

// StudentRoute.use(cors(options))

StudentRoute.get('/', getAllStudents)
StudentRoute.post('/', addStudent)
StudentRoute.put('/', updateStudent)
StudentRoute.delete('/:Id', deleteStudent)

// StudentRoute.options('*', cors(options))

export default StudentRoute

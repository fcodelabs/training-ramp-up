import express from 'express'
import {
  getUser,
  addUser
} from '../controllers/UserController'

const StudentRoute = express.Router()

StudentRoute.post('/', getUser)
StudentRoute.post('/add', addUser)

export default StudentRoute

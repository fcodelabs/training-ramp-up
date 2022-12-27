import express from 'express'
import {
  getUser,
  addUser
} from '../controllers/UserController'

const StudentRoute = express.Router()

StudentRoute.post('/signin', getUser)
StudentRoute.post('/signup', addUser)

export default StudentRoute

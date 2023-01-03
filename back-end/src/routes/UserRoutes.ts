import express from 'express'
import {
  getUser,
  addUser
} from '../controllers/UserController'
import { refreshUser } from '../services/AuthService'

const StudentRoute = express.Router()

StudentRoute.post('/signin', getUser)
StudentRoute.post('/signup', addUser)
StudentRoute.post('/refresh', refreshUser)

export default StudentRoute

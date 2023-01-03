import express from 'express'
import {
  getUser,
  addUser
} from '../controllers/UserController'
import { refreshUser } from '../services/AuthService'

const UserRoute = express.Router()

UserRoute.post('/signin', getUser)
UserRoute.post('/signup', addUser)
UserRoute.post('/refresh', refreshUser)

export default UserRoute

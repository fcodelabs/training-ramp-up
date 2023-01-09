import express from 'express'
import {
  getUser,
  addUser,
  signoutUser
} from '../controllers/UserController'
import { refreshUser } from '../services/AuthService'

const UserRoutes = express.Router()

UserRoutes.post('/signin', getUser)
UserRoutes.post('/signup', addUser)
UserRoutes.post('/signout', signoutUser)
UserRoutes.post('/refresh', refreshUser)
// authService(['Admin', 'Guest'])

export default UserRoutes

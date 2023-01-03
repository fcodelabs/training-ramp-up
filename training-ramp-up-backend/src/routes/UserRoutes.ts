import * as express from 'express'


import {
    requestGetAllUser,requestSignUp,requestSignIn,requestSignOut
} from '../controllers/UserController'

const route = express.Router()

route.get('/:username/:password', requestSignIn)
route.get('/', requestGetAllUser)
route.post('/', requestSignUp)
route.delete('/', requestSignOut)



export default route

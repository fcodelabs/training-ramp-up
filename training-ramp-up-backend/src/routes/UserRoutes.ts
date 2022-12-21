import * as express from 'express'

import {
    requestGetUser,
    requestAddUser,
    requestGetAllUser
} from '../controllers/UserController'

const route = express.Router()

route.get('/:username', requestGetUser)
route.get('/', requestGetAllUser)
route.post('/', requestAddUser)


export default route

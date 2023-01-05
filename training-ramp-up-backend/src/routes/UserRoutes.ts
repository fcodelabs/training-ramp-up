import * as express from 'express'

import {
    requestGetAllUser,
    requestSignUp,
    requestSignIn,
    requestSignOut,
    requestNewAccessToken,
} from '../controllers/UserController'
import { authorization } from '../middleware/auth'

const route = express.Router()

route.post('/', requestSignIn)
route.get('/', requestGetAllUser)
route.post('/', requestSignUp)
route.post('/refresh', requestNewAccessToken)
route.delete('/', authorization, requestSignOut)


export default route

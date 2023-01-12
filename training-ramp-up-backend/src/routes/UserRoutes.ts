import * as express from 'express'

import {
    requestSignUp,
    requestSignIn,
    requestSignOut,
    requestNewAccessToken,
    requestUserDetails,
} from '../controllers/userController'
import { authorization } from '../middleware/auth'

const route = express.Router()

route.post('/', requestSignIn)
route.post('/signUp', requestSignUp)
route.post('/refresh', requestNewAccessToken)
route.post('/userDetails', authorization, requestUserDetails)
route.delete('/', authorization, requestSignOut)

export default route

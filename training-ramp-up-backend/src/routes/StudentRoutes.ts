import * as express from 'express'

import {
    requestGetAllStudents,
    requestAddStudent,
    requestUpdateStudent,
    requestDeleteStudent,
} from '../controllers/studentController'
import { authorization, authPermissions } from '../middleware/auth'

const route = express.Router()

route.get('/', authorization, requestGetAllStudents)
route.post('/', authorization, authPermissions, requestAddStudent)
route.patch('/', authorization, authPermissions, requestUpdateStudent)
route.delete('/:id', authorization, authPermissions, requestDeleteStudent)

export default route

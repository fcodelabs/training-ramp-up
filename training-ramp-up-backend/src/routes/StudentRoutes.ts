import * as express from 'express'

import {
    requestGetAllStudents,
    requestAddStudent,
    requestUpdateStudent,
    requestDeleteStudent,
} from '../controllers/StudentController'
import { authorization } from '../middleware/auth'

const route = express.Router()

route.get('/', authorization,requestGetAllStudents)
route.post('/', authorization,requestAddStudent)
route.patch('/', authorization,requestUpdateStudent)
route.delete('/:id',authorization, requestDeleteStudent)

export default route

import * as express from 'express'

import {
    requestGetAllStudents,
    requestAddStudent,
    requestUpdateStudent,
    requestDeleteStudent,
} from '../controllers/StudentController'

const route = express.Router()

route.get('/', requestGetAllStudents)
route.post('/', requestAddStudent)
route.put('/', requestUpdateStudent)
route.delete('/:id', requestDeleteStudent)

export default route

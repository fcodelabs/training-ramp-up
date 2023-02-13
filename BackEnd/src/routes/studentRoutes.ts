import  express  from "express";
import { addStudent, deleteStudent, getAllStudents, updateStudent } from '../controllers/studentController'
const verifyJwt  = require ('../middlewares/verifyJwt')

const router = express.Router();
router.get('/', getAllStudents)
router.post('/', addStudent)
router.patch('/:id', updateStudent)
router.delete('/:id', deleteStudent)

export default router;
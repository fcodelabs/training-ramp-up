import express from 'express';
import { getAllStudents, addStudent, deleteStudent, patchStudent } from '../controllers/StudentController';
import {
  studentAddValidationRules,
  studentValidation,
  studentPatchValidationRules,
} from '../utils/Validation/StudentValidation';
const router = express.Router();

router.post('/', studentAddValidationRules(), studentValidation, addStudent);
router.get('/', getAllStudents);
router.patch('/:id', studentPatchValidationRules(), studentValidation, patchStudent);
router.delete('/:id', deleteStudent);

export default router;

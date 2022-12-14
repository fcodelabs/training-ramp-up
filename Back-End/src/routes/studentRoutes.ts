import express from 'express';
import {
  getAllStudents,
  addStudent,
  updateStudent,
  deleteStudent,
  patchStudent,
} from '../controllers/StudentController';
import {
  studentAddOrUpdateValidationRules,
  studentValidation,
  studentPatchValidationRules,
} from '../utils/Validation/StudentValidation';
const router = express.Router();

router.post('/', studentAddOrUpdateValidationRules(), studentValidation, addStudent);
router.get('/', getAllStudents);
router.put('/:id', studentAddOrUpdateValidationRules(), studentValidation, updateStudent);
router.patch('/:id', studentPatchValidationRules(), studentValidation, patchStudent);
router.delete('/:id', deleteStudent);

export default router;

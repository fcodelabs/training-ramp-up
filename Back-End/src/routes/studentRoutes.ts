import express from 'express';
import { getAllStudents, addStudent, deleteStudent, patchStudent } from '../controllers/StudentController';
import {
  studentAddValidationRules,
  studentValidation,
  studentPatchValidationRules,
} from '../utils/Validation/StudentValidation';
import isAuthenticated from '../utils/Authentication';
import RoleCheck from '../utils/RoleCheck';

const studentRouter = express.Router();

studentRouter.post('/', studentAddValidationRules(), studentValidation, isAuthenticated, RoleCheck, addStudent);
studentRouter.get('/', isAuthenticated, RoleCheck, getAllStudents);
studentRouter.patch('/:id', studentPatchValidationRules(), isAuthenticated, RoleCheck, studentValidation, patchStudent);
studentRouter.delete('/:id', isAuthenticated, RoleCheck, deleteStudent);

export default studentRouter;

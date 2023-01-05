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

studentRouter.post(
  '/',
  studentAddValidationRules(),
  studentValidation,
  isAuthenticated,
  RoleCheck(['admin']),
  addStudent
);
studentRouter.get('/', isAuthenticated, RoleCheck(['admin', 'user']), getAllStudents);
studentRouter.patch(
  '/:id',
  studentPatchValidationRules(),
  isAuthenticated,
  RoleCheck(['admin']),
  studentValidation,
  patchStudent
);
studentRouter.delete('/:id', isAuthenticated, RoleCheck(['admin', 'user']), deleteStudent);

export default studentRouter;

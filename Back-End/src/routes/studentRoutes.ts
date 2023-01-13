import express from 'express';
import { getAllStudents, addStudent, deleteStudent, patchStudent } from '../controllers/studentController';
import { studentAddValidationRules, studentValidation } from '../utils/Validation/studentValidation';
import isAuthenticated from '../utils/authentication';
import RoleCheck from '../utils/roleCheck';

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
studentRouter.patch('/', isAuthenticated, RoleCheck(['admin']), patchStudent);
studentRouter.delete('/:id', isAuthenticated, RoleCheck(['admin']), deleteStudent);

export default studentRouter;

import express from 'express';
import { getStudents, addStudent, deleteStudent, updateStudent } from '../controllers/studentController';
import passport from 'passport';
import { roleCheck } from '../utils/roleCheck';

import '../configs/passport';

const studentRouter = express.Router();

studentRouter
  .get('/', passport.authenticate('jwt', { session: false }), getStudents)
  .post('/', passport.authenticate('jwt', { session: false }), roleCheck, addStudent)
  .delete('/:id', passport.authenticate('jwt', { session: false }), roleCheck, deleteStudent)
  .patch('/:id', passport.authenticate('jwt', { session: false }), roleCheck, updateStudent);

export default studentRouter;

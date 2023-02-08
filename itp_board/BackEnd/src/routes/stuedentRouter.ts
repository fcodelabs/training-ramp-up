import express from 'express'
import { createStudent, getAllStudents, updateStudentById, deleteStudentById } from '../controllers/studentController'
import {studentValidations} from "../validations/studentValidations";
import {validator} from "../middlewares/validator";
import auth from "../middlewares/auth";

const studentRouter:express.Router = express.Router()

studentRouter.get('/',auth, getAllStudents);
studentRouter.post('/',auth,studentValidations,validator, createStudent);
studentRouter.patch('/',auth, updateStudentById)
studentRouter.delete('/:id',auth,deleteStudentById)

export default studentRouter

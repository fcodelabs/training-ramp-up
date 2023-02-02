import express from 'express'
import { createStudent, getAllStudents, updateStudentById, deleteStudentById } from '../controllers/studentController'
import {studentValidations} from "../validations/studentValidations";
import {validator} from "../middlewares/validator";

const studentRouter:express.Router = express.Router()

studentRouter.get('/', getAllStudents);
studentRouter.post('/',studentValidations,validator, createStudent);
studentRouter.put('/', updateStudentById)
studentRouter.delete('/:id',deleteStudentById)

export default studentRouter

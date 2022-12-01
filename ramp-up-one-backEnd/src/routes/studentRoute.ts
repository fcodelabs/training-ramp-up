import express from 'express';
import {
  getAllCustomer,
  saveStudent,
  updateStudent,
  deleteStudent,
} from '../controllers/studentController';

const route = express.Router();
route.get('/', getAllCustomer);
route.post('/', saveStudent);
route.put('/', updateStudent);
route.delete('/:ID', deleteStudent);

export default route;

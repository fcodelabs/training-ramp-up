import express from 'express';
import {
  getAllCustomer,
  saveStudent,
  updateStudent,
  deleteStudent,
} from '../controllers/studentController';
import { authorization } from '../middlewares/checkAuth';
const route = express.Router();
route.get('/', authorization, getAllCustomer);
route.post('/', authorization, saveStudent);
route.patch('/', updateStudent);
route.delete('/:ID', deleteStudent);

export default route;
 


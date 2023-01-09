import express from 'express';
import {
  getAllCustomer,
  saveStudent,
  updateStudent,
  deleteStudent,
} from '../controllers/studentController';
import { permissions } from '../middlewares/checkAuth';
const route = express.Router();
route.get('/', permissions, getAllCustomer);
route.post('/',permissions, saveStudent);
route.patch('/',permissions, updateStudent);
route.delete('/:ID',permissions, deleteStudent);

export default route;
 


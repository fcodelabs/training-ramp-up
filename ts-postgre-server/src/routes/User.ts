import express from 'express';
import { createPassword, createUser, deleteAllUsers, loginUser, registerUser } from '../controllers/User';
import { userValidation } from '../middlewares/expressValidator/userValidation';

const router = express.Router();

// User Routes
router.post('/', createUser);
router.put('/:token', createPassword);
router.post('/register',userValidation, registerUser)
router.post('/login', loginUser)
router.delete('/', deleteAllUsers);


export default router;

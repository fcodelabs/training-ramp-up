import express from 'express';
import { createPassword, createUser, loginUser, registerUser } from '../controllers/User';
import { userValidation } from '../middlewares/expressValidator/userValidation';

const router = express.Router();


router.post('/', createUser);
router.put('/:token', createPassword);
router.post('/register',userValidation, registerUser)
router.post('/login', loginUser)


export default router;

import  express  from "express";
import { signInUser, signUpNewUser } from '../controllers/userController'

const router = express.Router();
router.post('/signup', signUpNewUser)
router.post('/signin', signInUser)

export default router;
import  express  from "express";
import { signUpNewUser } from '../controllers/userController'

const router = express.Router();
router.post('/signup', signUpNewUser)

export default router;
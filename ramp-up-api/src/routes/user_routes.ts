import * as express from 'express';
const router = express.Router();
import { logUser, signupUser } from '../controller/userController';

router.post('/api/user', signupUser);
router.get('/user', logUser);

export default router;

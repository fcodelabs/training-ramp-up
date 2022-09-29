import * as express from 'express';
const router = express.Router();
import { postUser, findUser } from '../service/userService';

router.post('/api/user', postUser);
router.get('/user', findUser);

export default router;

import * as express from 'express';
const router = express.Router();
import {
  //   getUser,
  postUser,
  findUser,
  //   deleteUser,
  //   updateUser,
} from '../service/userService';

// router.get('/api/user', getUser);
router.post('/api/user', postUser);
router.get('/user', findUser);
// router.get('/api/user/:userId', findUser);
// router.delete('/api/user/:userId', deleteUser);
// router.put('/api/user/:userId', updateUser);

export default router;

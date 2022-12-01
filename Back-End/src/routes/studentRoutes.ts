import express from 'express';
import { addStudent } from '../controllers/studentController';

const router = express.Router();

router.post('/', addStudent);

export default router;

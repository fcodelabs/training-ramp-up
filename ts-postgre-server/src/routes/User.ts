// src/routes/studentRoutes.ts
import express from 'express';
import { createPassword, createUser } from '../controllers/User';

const router = express.Router();


router.post('/', createUser);
router.put('/:token', createPassword);


export default router;

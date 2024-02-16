import express from "express";
import { addNewStudent } from "../controllers/studentController";

const router = express.Router();

// Create a new student
router.post("/add", addNewStudent);

export default router;
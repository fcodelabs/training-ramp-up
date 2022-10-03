import express from "express";
import { addStudent, getAllStudents } from "../services/studentServices";

const router = express.Router();

router.get("/", getAllStudents);
router.post("/", addStudent);

export default router;

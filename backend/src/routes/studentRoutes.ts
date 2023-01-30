import {
  createStudent,
  deleteStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
} from "../controllers/studentController";
import { Router } from "express";
import { verifyJWT } from "../middleware/verifyJWT";
import { validateData, validata } from '../middleware/validator';

const router = Router();

router.get("/", getAllStudents);
router.get("/:id", getStudentById);
router.post("/", createStudent);
router.put("/", validateData, validata,  updateStudent);
router.delete("/:id", deleteStudent);
export default router;

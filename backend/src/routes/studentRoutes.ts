import {
  createStudent,
  deleteStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
} from "../controllers/studentController";
import { Router } from "express";
import { verifyJWT } from "../middleware/verifyJWT";
import { validateData, validata } from "../middleware/validator";
import verifyRoles from "../middleware/verifyRoles";

const router = Router();

router.get("/", verifyJWT, verifyRoles(["admin", "geust"]), getAllStudents);
router.get("/:id", getStudentById);
router.post("/", validateData, validata, createStudent);
router.put("/", validateData, validata, updateStudent);
router.delete("/:id", deleteStudent);

export default router;

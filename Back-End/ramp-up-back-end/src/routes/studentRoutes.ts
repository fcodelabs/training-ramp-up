import express from "express";
import {
  addStudent,
  deleteStudent,
  getAllStudents,
  updateStudent,
} from "../controllers/studentController";

const router = express.Router();

router.get("/", getAllStudents);
router.post("/", addStudent);
router.put("/:studentId", updateStudent);
router.delete("/:studentId", deleteStudent);

export default router;

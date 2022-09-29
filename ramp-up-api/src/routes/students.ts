import express from "express";
import {
  getStudents,
  addStudent,
  deleteStudent,
  updateStudent,
} from "../controllers/students";
import verifyToken from "../middleware/auth";

const router = express.Router();

router.get("/", verifyToken, getStudents);

router.post("/", verifyToken, addStudent);

router.delete("/:ID", verifyToken, deleteStudent);

router.patch("/:ID", verifyToken, updateStudent);

export default router;

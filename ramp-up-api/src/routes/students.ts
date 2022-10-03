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

router.delete("/:id", verifyToken, deleteStudent);

router.patch("/:id", verifyToken, updateStudent);

export default router;

import express from "express";
import {
  getStudent,
  postStudent,
  deleteStudent,
  updateStudent,
} from "../services/student.service";

const router = express.Router();

router.get("/", getStudent);
router.post("/", postStudent);
router.delete("/:studentId", deleteStudent);
router.put("/:studentId", updateStudent);

export default router;

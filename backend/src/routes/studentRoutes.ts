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

const studentRouter = Router();

studentRouter.get(
  "/",
  verifyJWT,
  verifyRoles(["admin", "geust"]),
  getAllStudents
);
studentRouter.get("/:id", getStudentById);
studentRouter.post(
  "/",
  verifyJWT,
  validateData,
  validata,
  verifyRoles(["admin"]),
  createStudent
);
studentRouter.put(
  "/",
  validateData,
  validata,
  verifyRoles(["admin"]),
  updateStudent
);
studentRouter.delete("/:id", deleteStudent);

export default studentRouter;

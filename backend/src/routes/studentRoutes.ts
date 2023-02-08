import { verifyJWT } from "./../middleware/verifyJWT";
import {
  createStudent,
  deleteStudent,
  getAllStudents,
  updateStudent,
} from "../controllers/studentController";
import { Router } from "express";
import { validateData, validate } from "../middleware/validator";
import verifyRoles from "../middleware/verifyRoles";
import { ensureAuth } from "../middleware/authentication";
const studentRouter = Router();

studentRouter.get(
  "/",
  verifyJWT,
  verifyRoles(["admin", "geust"]),
  getAllStudents
);
studentRouter.get("/auth", ensureAuth, getAllStudents);
studentRouter.post(
  "/",
  verifyJWT,
  validateData,
  validate,
  verifyRoles(["admin"]),
  createStudent
);
studentRouter.patch(
  "/",
  verifyJWT,
  validateData,
  validate,
  verifyRoles(["admin", "editor"]),
  updateStudent
);
studentRouter.delete("/:id", verifyJWT, deleteStudent);

export default studentRouter;

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
import { Role } from "../models/user";
const studentRouter = Router();

studentRouter.get("/auth", ensureAuth, getAllStudents);
studentRouter.get(
  "/",
  verifyJWT,
  verifyRoles([Role.ADMIN, Role.EDITOR, Role.GUEST]),
  getAllStudents
);
studentRouter.post(
  "/",
  verifyJWT,
  validateData,
  validate,
  verifyRoles([Role.ADMIN]),
  createStudent
);
studentRouter.patch(
  "/",
  verifyJWT,
  validateData,
  validate,
  verifyRoles([Role.ADMIN, Role.EDITOR]),
  updateStudent
);
studentRouter.delete("/:id", verifyJWT, verifyRoles([Role.ADMIN, Role.EDITOR]), deleteStudent);

export default studentRouter;

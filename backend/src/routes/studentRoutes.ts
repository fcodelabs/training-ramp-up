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

studentRouter.get("/auth", ensureAuth, getAllStudents);
studentRouter.get(
  "/",
  verifyJWT,
  verifyRoles(["admin", "geust","editor"]),
  getAllStudents
);
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
studentRouter.delete("/:id", verifyJWT, verifyRoles(["admin", "editor"]), deleteStudent);

export default studentRouter;

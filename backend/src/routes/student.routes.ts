import express from "express";
import { body } from "express-validator";

import * as StudentController from "../controllers/student.controllers";

export const studentRouter = express.Router();

studentRouter.get("/", StudentController.getStudents);

studentRouter.get("/:id", StudentController.getStudent);

studentRouter.post(
  "/",
  body("name").isString(),
  body("gender").isString(),
  body("address").isString(),
  body("mobileNo").isString(),
  body("dateOfBirth").isString(),
  body("age").isNumeric(),
  StudentController.createStudent
);

studentRouter.put(
  "/:id",
  body("name").isString(),
  body("gender").isString(),
  body("address").isString(),
  body("mobileNo").isString(),
  body("dateOfBirth").isString(),
  body("age").isNumeric(),
  StudentController.updateStudent
);

studentRouter.delete("/:id", StudentController.deleteStudent);

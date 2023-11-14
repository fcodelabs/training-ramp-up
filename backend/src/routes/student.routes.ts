import express from "express";
import { body } from "express-validator";

import * as StudentController from "../controllers/student.controllers";
import { AuthenticationMiddleware } from "../middlewares/auth.middleware";

export const studentRouter = express.Router();

studentRouter.get(
  "/",
  AuthenticationMiddleware("USER"),
  StudentController.getStudents
);

studentRouter.get(
  "/:id",
  AuthenticationMiddleware("USER"),
  StudentController.getStudent
);

studentRouter.post(
  "/",
  AuthenticationMiddleware("ADMIN"),
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
  AuthenticationMiddleware("ADMIN"),
  body("name").isString(),
  body("gender").isString(),
  body("address").isString(),
  body("mobileNo").isString(),
  body("dateOfBirth").isString(),
  body("age").isNumeric(),
  StudentController.updateStudent
);

studentRouter.delete(
  "/:id",
  AuthenticationMiddleware("ADMIN"),
  StudentController.deleteStudent
);

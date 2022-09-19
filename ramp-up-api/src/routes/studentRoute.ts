import express from "express";
import {
  getStudent,
  postStudent,
  deleteStudent,
  updateStudent,
} from "../services/student.service";

import cors from "cors";
import * as BodyParser from "body-parser";

const app = express();
app.use(cors());
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: false }));

const router = express.Router();

router.get("/students", getStudent);
router.post("/students", postStudent);
router.delete("/students/:id", deleteStudent);
router.put("/students/:id", updateStudent);

export default router;

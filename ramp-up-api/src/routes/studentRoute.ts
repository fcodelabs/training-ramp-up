import express from "express";
import {
  getStudent,
  postStudent,
  deleteStudent,
  updateStudent,
} from "../controllers/student.controller";
const userAuth = require('../middleware/userAuth');
import cors from "cors";
import * as BodyParser from "body-parser";

const app = express();
app.use(cors());
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: false }));

const router = express.Router();

router.get("/students",userAuth, getStudent);
router.post("/students",userAuth, postStudent);
router.delete("/students/:id",userAuth, deleteStudent);
router.put("/students/:id",userAuth, updateStudent);

export default router;
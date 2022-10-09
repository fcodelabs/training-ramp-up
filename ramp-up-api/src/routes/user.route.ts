import express from "express";
import { postUser } from "../services/user.service";
import { registerUser , SignInUser } from "../controllers/user.controller";

import cors from "cors";
import * as BodyParser from "body-parser";

const app = express();
app.use(cors());
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: false }));

const router = express.Router();

router.get("/singin", SignInUser);
router.post("/signup", registerUser);

export default router;


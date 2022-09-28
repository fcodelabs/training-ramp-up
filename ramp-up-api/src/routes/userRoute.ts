import express from "express";
import { postUser, findUser } from "../controllers/user.controller";

import cors from "cors";
import * as BodyParser from "body-parser";

const app = express();
app.use(cors());
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: false }));

const router = express.Router();

router.get("/singin", findUser);
router.post("/signup", postUser);

export default router;


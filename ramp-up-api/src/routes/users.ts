import express from "express";

import {
  addUser,
  getUser,
  refreshUser,
  signOutUser,
} from "../controllers/users";

const router = express.Router();

router.post("/add", addUser);

router.post("/get", getUser);

router.post("/refresh", refreshUser);

router.patch("/signout", signOutUser);

export default router;

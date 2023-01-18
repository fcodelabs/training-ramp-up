import { createUser, deleteUser, updateUser } from './../controllers/UserController';
import { Router } from "express";
import { getAllUsers, getUserById } from "../controllers/UserController";

const router = Router();

router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.post("/", createUser);
router.put("/", updateUser);
router.delete("/:id", deleteUser);
export default router;
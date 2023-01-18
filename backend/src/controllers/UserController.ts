
import {
  createUserService,
  deleteAllUserService,
  deleteUserService,
  getAllUsersService,
  getUserByIdService,
  updateUserService,
} from "../services/UserServices";
import { Request, Response } from "express";
import { User } from "../models/User";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    console.log("getAllUsers");
    const allrecords = await getAllUsersService();

    res.send(allrecords);
  } catch (err) {
    // console.log(err);
    res.send(err);
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const user = await getUserByIdService(id);

    res.send(user);
  } catch (err) {
    res.send(err);
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const user = req.body.data;
    console.log(req.body.data);
    const userInsert = await createUserService(user);
    const socket = req.app.get("socket");
    socket.emit("notification", `New user created successfully Name: ${userInsert?.PersonName}  !`);
    res.status(201).send(userInsert);
  } catch (err) {
    res.status(400).send(err);
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const user = req.body.data;
    const userUpdate = await updateUserService(user);
    
     const socket = req.app.get("socket");
    socket.emit("notification", `User updated successfully Name: ${userUpdate?.PersonName}  !`);
    res.send(userUpdate);
  } catch (err) {
    res.send(err);
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const userDelete = await deleteUserService(id);
     const socket = req.app.get("socket");
    socket.emit("notification", `User deleted successfully Name: ${userDelete?.PersonName}  !`);
    res.send(userDelete);
  } catch (err) {
    res.send(err);
  }
};
export const deleteAllUser = async (req: Request, res: Response) => {
  try {
    const userDelete = await deleteAllUserService();
    res.send(userDelete);
  } catch (err) {
    res.send(err);
  }
};

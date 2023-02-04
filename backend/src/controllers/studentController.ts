import {
  createStudentService,
  deleteStudentService,
  getAllStudentsService,
  updateStudentService,
} from "../services/studentServices";
import { Request, Response } from "express";

export const getAllStudents = async (req: Request, res: Response) => {
  try {
    const allrecords = await getAllStudentsService();
    res.send(allrecords);
  } catch (err) {
    // console.log(err);
    res.status(400).send(err);
  }
};


export const createStudent = async (req: Request, res: Response) => {
  try {
    const user = req.body.data;
    
    const userInsert = await createStudentService(user);
    const socket = req.app.get("socket");
    socket.emit(
      "notification",
      `New user created successfully Name: ${userInsert?.PersonName}  !`
    );
    res.status(201).send(userInsert);
  } catch (err) {
    res.status(400).send(err);
  }
};

export const updateStudent = async (req: Request, res: Response) => {
  try {
    const user = req.body.data;

    const userUpdate = await createStudentService(user);
    const socket = req.app.get("socket");
    socket.emit(
      "notification",
      `User updated successfully Name: ${userUpdate?.PersonName}  !`
    );
    res.status(201).send(userUpdate);
  } catch (err) {
     res.status(400).send(err);
  }
};

export const deleteStudent = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const userDelete = await deleteStudentService(id);
    const socket = req.app.get("socket");
    socket.emit(
      "notification",
      `User deleted successfully Name: ${userDelete?.PersonName}  !`
    );
    res.send(userDelete);
  } catch (err) {
    res.send(err);
  }
};


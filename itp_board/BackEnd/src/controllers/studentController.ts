import {NextFunction, Request, Response} from "express";
import {create, fetchAll, remove, update} from "../services/studentServices";

async function getAllStudents(req:Request,res:Response,next:NextFunction):Promise<void>{
  try{
    const students = await fetchAll();
    res.status(200).json(students);
  }catch (error) {
    next(error);
  }
}
async function createStudent(req:Request,res:Response,next:NextFunction) {
  try{
    const { name, gender, address, dateOfBirth, mobileNo } = req.body
    const response = await create( name, gender, address, dateOfBirth, mobileNo);
    res.status(200).json(response);
  }catch (error) {
    next(error);
  }
}

async function updateStudentById(req:Request,res:Response,next:NextFunction) {
  try{
    const { id, ...rest } = req.body;
    const response = await update(id,rest);
    res.status(200).json(response);
  }catch (error) {
    next(error);
  }
}

async function deleteStudentById(req:Request,res:Response,next:NextFunction){
 try{
   const id = parseInt(req.params.id);
   const response = await remove(id);
   res.status(200).json(response);
 }catch (error) {
   next(error);
 }
}

export {createStudent, getAllStudents, updateStudentById, deleteStudentById }


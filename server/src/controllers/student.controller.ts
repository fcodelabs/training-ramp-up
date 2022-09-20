import {Response,Request} from "express";
import {addStudent,updateStudent,deleteStudent,getStudents} from "../services";

export async function getAll(req: Request,res: Response){
    const result:any= await getStudents();
    if(result.error){
        res.status(400).json({message:"Failed to retrieve student data!",error:result.error});
        return;
    }
    res.status(200).json({message:"Successfully retrieved data!",students:result.students});
}

export async function addOne( req: Request , res: Response ){
    const result = await addStudent(req.body);
    if(result.error){
        res.status(400).json({message:"Failed to add student!",error:result.error});
        return;
    }
   res.status(200).json({message:"Student has been added successfully!",student:result.data});
}

export async function updateOne(req: Request , res: Response){
    const id = parseInt(req.params.id);
    const data = req.body;
    const result = await updateStudent(id,data);
    if(result.error){
        res.status(400).json({message:"Error occured updating the student!",error:result.error})
        return;
    }
    res.status(200).json({message:"Successfully updated the student",updatedStudent:result.data});
}

export async function deleteOne(req: Request, res: Response){
    let id:number = parseInt(req.params.id);
    const result = await deleteStudent(id);
    if(result.error){
        res.status(400).json({message:"Error occured while deleting the student!",error:result.error})
        return;
    }
    res.status(200).json({message:"Successfully deleted the student"});
}
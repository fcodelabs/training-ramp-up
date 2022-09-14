import express,{Response,Request,Router} from "express";
import {addStudent,updateStudent,deleteStudent,getStudents} from "../services";
const router:Router=express.Router();


router.get("/",async (req:Request,res:Response)=>{
    const result:any= await getStudents();
    if(result.error){
        res.status(400).send({message:result.error});
        return;
    }
    res.status(200).send({message:"Student data recieved!",students:result});
})

router.post("/",async (req:Request,res:Response)=>{
    const data = req.body;
    const result = await addStudent(data);
    if(result.error){
        res.status(400).send({message:result.error});
        return;
    }
    res.status(200).send({message:result.message,student:result.data});
})

router.put("/:id",async (req:Request,res:Response)=>{
    const id = parseInt(req.params.id);
    const data = req.body;
    const result = await updateStudent(id,data);
    if(result.error){
        res.status(400).send({message:result.error})
        return;
    }
    res.status(200).send({message:result.message,updatedStudent:result.data});
})

router.delete("/:id",async (req:Request,res:Response)=>{
    let id:number = parseInt(req.params.id);
    const result = await deleteStudent(id);
    if(result.error){
        res.status(400).send({message:result.error})
        return;
    }
    res.status(200).send({message:result.message});
})

export default router
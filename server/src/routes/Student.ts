import express,{Response,Request,Router} from "express";
import {addStudent,updateStudent,deleteStudent,getStudents} from "../services";
const router:Router=express.Router();

//dummy data for manipulation
import {dummy_data} from "../util/temp-data";


router.get("/",(req:Request,res:Response)=>{
    // const students = getStudents();
    res.send({message:"All Student data recieved!",data:dummy_data});
})

router.post("/",(req:Request,res:Response)=>{
    const data = req.body;
    const newStudent = addStudent(data,dummy_data);
    res.send({message:"Student has been created!",data:newStudent});

})

router.put("/:id",(req:Request,res:Response)=>{
    let id = parseInt(req.params.id);
    let data = req.body;
    const updatedStudent = updateStudent(id,data,dummy_data);
    res.send({message:"Student has been updated!",data:updatedStudent});
})

router.delete("/:id",(req:Request,res:Response)=>{
    let id:number = parseInt(req.params.id);
    const deletedStudent = deleteStudent(id,dummy_data);
    res.send({message:"Student has been deleted!",data:deletedStudent});
})

export default router
import express, { Express, Request, Response } from 'express'
import { Student } from '../../models/Student/student';
const student=express.Router()
const students:Array<Student> =[];

student.get('/',async (req,res)=>{
    try {
        res.send(students)
        //const users = await User.find()
        //res.json(users)
    }catch (err){
        res.send("Error" +err)
    }

})


student.post('/',async (req,res)=>{
    try {
        students.push(req.body);
        res.send(students);
        //const users = await User.find()
        //res.json(users)
    }catch (err){
        res.send("Error" +err)
    }

})

student.put('/',async (req,res)=>{
    try {
        const temp = students.find(student=>student.id==req.body.id);
        if(temp!=null){
           const index =students.indexOf(temp);
           students[index]=req.body;
           res.send(students);
        }
       
        
    }catch (err){
        res.send("Error" +err)
    }

})


student.delete('/:id',async (req,res)=>{
    try {
        
        const temp = students.find(student=>req.params.id==student.id.toString());
        if(temp){
           const index =students.indexOf(temp);
           students.splice(index,1);
           res.send(students);
        }
       
        
    }catch (err){
        res.send("Error" +err)
    }

})


export default student
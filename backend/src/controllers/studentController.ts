import { Student } from "../models/Student";
import { Request, Response } from "express";
import { AppDataSource } from "../index";

export const addNewStudent = async (req: Request, res: Response) => {
    try {

        console.log("hello 1")
        const studentRepository = AppDataSource.getRepository(Student);
        // Create a new student instance with data from the request body
        console.log("hello 2") 
        const newStudent = studentRepository.create(req.body);
        console.log("hello 3") 
        console.log(req.body)
        console.log(newStudent);

        // Save the new student to the database
        const savedStudent = await studentRepository.save(newStudent);

        // Send the saved student data as the response
        res.status(201).json(savedStudent);
    } catch (error) {
        // Log the error for debugging purposes
        console.log(req.body)
        console.error("Error adding a new student:", error);

        // Send an error response with a 500 Internal Server Error status code
        res.status(500).json({ error: "Internal Server Error" });
    }
};



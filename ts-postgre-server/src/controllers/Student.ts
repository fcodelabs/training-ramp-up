import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import * as studentService from '../services/Student';
import { io } from '../Server';

export const getStudents = async (_req: Request, res: Response) => {
    try {
        const students = await studentService.getStudentsService();
        io.emit('notification',{message:'Data fetched successfully'});
        return res.status(200).json(students);
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const createStudent = async (req: Request, res: Response) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const errorMessages = errors.array().map(error => error.msg);
            return res.status(400).json({ errors: errorMessages });
        }
        const newStudent = await studentService.createStudentService(req.body);
        return res.status(200).json(newStudent);
    } catch (error) {
        return res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
};

export const updateStudent = async (req: Request, res: Response) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            const errorMessages = errors.array().map(error => error.msg);
            return res.status(400).json({ errors: errorMessages });
        }

        const { id } = req.params;
        const updatedStudent = await studentService.updateStudentService(id, req.body);
       

        return res.status(200).json(updatedStudent);
    } catch (error) {
        return res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
};

export const deleteStudent = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const message = await studentService.deleteStudentService(id);
  

        return res.status(200).json({ message });
    } catch (error) {
        return res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
};

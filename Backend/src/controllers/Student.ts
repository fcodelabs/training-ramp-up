import { Request, Response } from 'express';
import { addStudentService, getStudentsService, deleteStudentService, updateStudentService } from '../services/Student';
import { io } from '../..';

export const getStudents = async (req: Request, res: Response): Promise<void> => {
  try {
    const students = await getStudentsService();
    res.status(200).send(students);
  } catch (error) {
    res.status(400).send('Error in getting students');
  }
};

export const addStudent = async (req: Request, res: Response): Promise<void> => {
  try {
    const student = await addStudentService(req.body);
    res.status(200).send(student);
    io.emit('notification', `New student added with name ${student.name}`);
  } catch (error) {
    res.status(400).send('Error in adding student');
  }
};

export const deleteStudent = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const deletedStudent = await deleteStudentService(id);
    res.status(200).send(`Student deleted Successfully with name ${deletedStudent && deletedStudent.name}`);
    io.emit('notification', `Student deleted Successfully with name ${deletedStudent && deletedStudent.name}`);
  } catch (error) {
    res.status(400).send('Error in deleting student');
  }
};

export const updateStudent = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const response = await updateStudentService(id, req.body);
    res.status(200).send('Student updated Successfully');
    io.emit('notification', `Student updated Successfully with name ${response.name}`);
  } catch (error) {
    res.status(400).send('Error in updating student');
  }
};

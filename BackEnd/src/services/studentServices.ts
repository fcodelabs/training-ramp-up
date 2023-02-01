import { Request, Response } from 'express';
import { PostgresDataSource } from '../configs/db';
import { Student } from '../models/StudentModel';

export function getStudents(req: Request, res: Response) {
    try {
        Student.find().then((data) =>{
            res.json(data);
          })
    } catch (err) {
        return res.status(500).send(err);
    }
}

export async function addNewStudent(req: Request, res: Response) {
    try {
        const newStudent = new Student();
        newStudent.name = req.body.name;
        newStudent.gender = req.body.gender;
        newStudent.address = req.body.address;
        newStudent.mobile = req.body.mobile;
        newStudent.dob = new Date(req.body.dob);
        newStudent.age = req.body.age;

        await PostgresDataSource.manager.save(newStudent);
        const student = PostgresDataSource.getRepository(Student).create(newStudent);
        const newSavedStudent = await PostgresDataSource.getRepository(Student).save(student);
        res.status(201).send(newSavedStudent)

    } catch (err) {
        return res.status(500).send(err);
    }
}

export async function updateSelectedStudent(req: Request, res: Response) {
    try {
        const id = +req.params.id;
        const studentRepository = PostgresDataSource.getRepository(Student);
        const studentToUpdate = await studentRepository.findOneBy({
            id: id
        });
        studentToUpdate!.name = req.body.name;
        studentToUpdate!.gender = req.body.gender;
        studentToUpdate!.address = req.body.address;
        studentToUpdate!.mobile = req.body.mobile;
        studentToUpdate!.dob = new Date(req.body.dob);
        studentToUpdate!.age = req.body.age;
        const updatedStudent = await studentRepository.save(studentToUpdate!);
        res.status(201).json(updatedStudent)
    }catch (err) {
        return res.status(500).send(err);
    }
}

export async function deleteSelectedStudent(req: Request, res: Response) {
    try {
        const id = +req.params.id;
        const studentRepository = PostgresDataSource.getRepository(Student);
        const studentToRemove = await studentRepository.findOneBy({
            id: id
        });

        await studentRepository.remove(studentToRemove!);
        console.log("Student has been Removed: ", studentToRemove);
        res.status(201).json({message: 'Student removed successfully!'})
    }catch (err) {
        return res.status(500).send(err);
    }
}
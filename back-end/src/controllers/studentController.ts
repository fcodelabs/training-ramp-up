import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Student } from "../models/StudentModel";
const generateOutput = require("../utils/outputFactory");



async function getStudents(req: Request, res: Response) {
    try {
        const students = await getRepository(Student).find();
        res.status(201).send(generateOutput(201, 'success', students));
    }
    catch (error) {
        res.status(500).send(generateOutput(500, 'error', 'Something went wrong'));
    }
};

async function addStudent(req: Request, res: Response) {
    try {
        const newStudent = {
            name: req.body.name,
            gender: req.body.gender,
            mobile: req.body.mobile,
            dob: req.body.dob,
            age: req.body.age,
        };
        const student = getRepository(Student).create(newStudent);
        const savedStudent = await getRepository(Student).save(student);
        res.status(201).send(generateOutput(201, 'success', savedStudent));
    } catch (error) {
        res.status(500).send(generateOutput(500, 'error', 'Something went wrong'));
    }
};

async function updateStudent(req: Request, res: Response) {
    try {
        const student = await getRepository(Student).findOne({ where: { id: parseInt(req.params.id, 10) } });
        if (student) {
            getRepository(Student).merge(student, req.body);
            const updatedStudent = await getRepository(Student).save(student);
            res.status(201).send(generateOutput(201, 'success', updatedStudent));
        }
    } catch (error) {
        res.status(500).send(generateOutput(500, 'error', 'Something went wrong'));
    }
};

async function deleteStudent(req: Request, res: Response) {
    try {
        const student = await getRepository(Student).delete(req.params.id);
        res.status(201).send(generateOutput(201, 'success', student));
    } catch (error) {
        res.status(500).send(generateOutput(500, 'error', 'Something went wrong'));
    }
};

async function getOneStudent(req: Request, res: Response) {
    try {
        const student = await getRepository(Student).findOne({ where: { id: parseInt(req.params.id, 10) } });
        res.status(201).send(generateOutput(201, 'success', student));
    } catch (error) {
        res.status(500).send(generateOutput(500, 'error', 'Something went wrong'));
    }
}



module.exports = { getStudents, addStudent, updateStudent, deleteStudent, getOneStudent }

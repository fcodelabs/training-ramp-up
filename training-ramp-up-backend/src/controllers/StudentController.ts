import * as express from 'express'
import { Express, Request, Response } from 'express'
import {
    getAllStudents,
    addStudent,
    updateStudent,
    deleteStudent,
} from '../services/StudentServices'

export const requestGetAllStudents = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const students = await getAllStudents()
        res.send(students)
    } catch (err) {
        res.send('Error' + err)
    }
}

export const requestAddStudent = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const students = await addStudent(req.body)
        res.send(students)
    } catch (err) {
        res.send('Error : ' +err.message)
    }
}

export const requestUpdateStudent = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const students = await updateStudent(req.body)
        res.send(students)
    } catch (err) {
        //throw err
        res.send('Error : ' +err.message)
    }
}

export const requestDeleteStudent = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const students = await deleteStudent(req.params.id)
        res.send(students)
    } catch (err) {
        res.send('Error : ' +err.message)
    }
}

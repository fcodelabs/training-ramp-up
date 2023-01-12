import * as express from 'express'
import { Express, Request, Response } from 'express'
import { io } from '../..'
import {
    getAllStudents,
    addStudent,
    updateStudent,
    deleteStudent,
} from '../services/studentServices'
import { validate } from '../utils/validateStudent'

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
        if (validate(req.body)) {
            const student = await addStudent(req.body)
            res.send(student)
            io.emit(
                'notification',
                'A student has been added with name :' + req.body.name
            )
        }
    } catch (err) {
        res.send('Error : ' + err.message)
    }
}

export const requestUpdateStudent = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        if (validate(req.body)) {
            const students = await updateStudent(req.body)
            res.send(students)
            io.emit(
                'notification',
                'The with id ' + req.body.id + ' student has been updated'
            )
        }
    } catch (err) {
        res.send('Error' + err.message)
    }
}

export const requestDeleteStudent = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const students = await deleteStudent(req.params.id)
        res.send(students)
        io.emit(
            'notification',
            'The with id ' + req.params.id + ' student has been deleted'
        )
    } catch (err) {
        res.send('Error' + err.message)
    }
}

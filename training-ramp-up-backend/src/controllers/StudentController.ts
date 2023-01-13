import * as express from 'express'
import { Express, Request, Response } from 'express'

import {
    getAllStudents,
    addStudent,
    updateStudent,
    deleteStudent,
} from '../services/studentServices'
import { io } from '../../server'
//import { io } from '../../index'
import { validate } from '../utils/validateStudent'

export const requestGetAllStudents = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const students = await getAllStudents()
        res.send(students)
    } catch (err) {
        res.status(400)
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
        res.status(400)
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
        res.status(400)
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
        res.status(400)
    }
}

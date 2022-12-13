import * as express from 'express'
import { Express, Request, Response } from 'express'
import { io } from '../..'
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
        io.emit(
            'notification',
            'A student has been added with name :' + req.body.name
        )
    } catch (err) {
        res.send('Error' + err)
    }
}

export const requestUpdateStudent = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const students = await updateStudent(req.body)
        res.send(students)
        io.emit(
            'notification',
            'The with id ' + req.body.id + ' student has been updated'
        )
    } catch (err) {
        res.send('Error' + err)
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
        res.send('Error' + err)
    }
}

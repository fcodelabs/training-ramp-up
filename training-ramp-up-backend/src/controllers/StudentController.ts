import * as express from 'express'
import { Express, Request, Response } from 'express'
import { Student } from '../models/Student'
import { appDataSource } from '../configs/dataSourceConfig'
import {
    getAllStudents,
    addStudent,
    updateStudent,
    deleteStudent,
} from '../services/StudentServices'
const student = express.Router()
const students: Array<Student> = []

student.get('/', async (req, res) => {
    try {
        const students = await getAllStudents()
        res.send(students)
        //const users = await User.find()
        //res.json(users)
    } catch (err) {
        res.send('Error' + err)
    }
})

student.post('/', async (req, res) => {
    try {
        const students = await addStudent(req.body)
        res.send(students)
        //const users = await User.find()
        //res.json(users)
    } catch (err) {
        res.send('Error' + err)
    }
})

student.put('/', async (req, res) => {
    try {
        const students = await updateStudent(req.body)
        res.send(students)
    } catch (err) {
        res.send('Error' + err)
    }
})

student.delete('/:id', async (req, res) => {
    try {
        const students = await deleteStudent(req.params.id)
        res.send(students)
    } catch (err) {
        res.send('Error' + err)
    }
})

export default student

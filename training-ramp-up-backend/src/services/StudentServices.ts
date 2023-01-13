import * as express from 'express'
import { Student } from '../models/Student'
import { appDataSource } from '../configs/dataSourceConfig'
import { DeleteResult, InsertEvent, InsertResult, UpdateResult } from 'typeorm'

export const getAllStudents = async (): Promise<Array<Student> | Object> => {
    try {
        const students = await appDataSource.manager
            .getRepository(Student)
            .find({
                order: {
                    id: 'DESC',
                },
            })
        return students
    } catch (err) {
        console.log(err)
        return { err: 'Can not fetch students.Error occured' }
    }
}

export const addStudent = async (input: Student): Promise<Student | Object> => {
    try {
        const student = { ...input }
        const res = await appDataSource.manager.insert(Student, student)
        return res
    } catch (err) {
        console.log(err)
        return { err: 'Add student failed.Error occured' }
    }
}

export const updateStudent = async (
    input: Student
): Promise<Student | Object> => {
    try {
        const student = { ...input }
        const students = await appDataSource.manager.update(
            Student,
            input.id,
            student
        )
        return students
    } catch (err) {
        console.log(err)
        return { err: 'Failed to update student.Error occured' }
    }
}

export const deleteStudent = async (id: string): Promise<Student | Object> => {
    try {
        const students = await appDataSource.manager.delete(Student, id)
        return students
    } catch (err) {
        console.log(err)

        return { err: 'Can not delete student.Error occured' }
    }
}

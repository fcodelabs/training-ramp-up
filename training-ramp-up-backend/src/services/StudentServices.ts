import * as express from 'express'
import { Student } from '../models/Student'
import { appDataSource } from '../configs/dataSourceConfig'
import { DeleteResult, InsertEvent, InsertResult, UpdateResult } from 'typeorm'

export const getAllStudents = async (): Promise<Array<Student>> => {
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
        throw err
    }
}

export const addStudent = async (input: Student): Promise<InsertResult> => {
    try {
        const student = { ...input }
        const res = await appDataSource.manager.insert(Student, student)
        return res
    } catch (err) {
        throw err
    }
}

export const updateStudent = async (input: Student): Promise<UpdateResult> => {
    try {
        const student = { ...input }
        const students = await appDataSource.manager.update(
            Student,
            input.id,
            student
        )
        return students
    } catch (err) {
        throw err
    }
}

export const deleteStudent = async (id: string): Promise<DeleteResult> => {
    try {
        const students = await appDataSource.manager.delete(Student, id)
        return students
    } catch (err) {
        throw err
    }
}

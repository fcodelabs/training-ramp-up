import * as express from 'express'
import { Student } from '../models/Student'
import { appDataSource } from '../configs/dataSourceConfig'
import { validate } from '../utils/validate'
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
        return err.message
    }
}

export const addStudent = async (input: Student): Promise<InsertResult> => {
    try {
        if (validate(input)) {
            const student = new Student()
            student.name = input.name
            student.address = input.address
            student.gender = input.gender
            student.dateOfBirth = input.dateOfBirth
            student.age = input.age
            student.mobileNo = input.mobileNo
            const res = await appDataSource.manager.insert(Student, student)

            return res
        }
    } catch (err) {
        return err.message
    }
}

export const updateStudent = async (input: Student): Promise<UpdateResult> => {
    try {
        if (validate(input)) {
            const student = new Student()
            student.id = input.id
            student.name = input.name
            student.address = input.address
            student.gender = input.gender
            student.dateOfBirth = input.dateOfBirth
            student.age = input.age
            student.mobileNo = input.mobileNo
            const students = await appDataSource.manager.update(
                Student,
                student.id,
                student
            )
            return students
        }
    } catch (err) {
        return err.message
    }
}

export const deleteStudent = async (id: string): Promise<DeleteResult> => {
    try {
        const students = await appDataSource.manager.delete(Student, id)
        return students
    } catch (err) {
        return err.message
    }
}

import * as express from 'express'
import { Student } from '../models/Student'
import { appDataSource } from '../configs/dataSourceConfig'




export const getAllStudents = async()=> {
    try {
        const students = await appDataSource.manager.find(Student)
        return students
    } catch (err) {
        return err
    }
}

export const addStudent = async(input)=> {
    try {
        const student = new Student()
        student.name = input.name
        student.address = input.address
        student.gender = input.gender
        student.dateOfBirth = input.dateOfBirth
        student.age = input.age
        student.mobileNo = input.mobileNo
        const students = await appDataSource.manager.save(student)
        return students
    } catch (err) {
        return err
    }
}

export const updateStudent = async(input)=> {
    try {
        const student = new Student()
        student.id=input.id
        student.name = input.name
        student.address = input.address
        student.gender = input.gender
        student.dateOfBirth = input.dateOfBirth
        student.age = input.age
        student.mobileNo = input.mobileNo
        const students = await appDataSource.manager.save(student)
        return students
    } catch (err) {
        return err
    }
}

export const deleteStudent = async(id:string)=> {
    try {
        const students = await appDataSource.manager.delete(
            Student,
            id
        )
        return students
    } catch (err) {
        return err
    }
}


import {
    requestAddStudent,
    requestDeleteStudent,
    requestGetAllStudents,
    requestUpdateStudent,
} from '../../controllers/studentController'
import * as studentServices from '../../services/studentServices'
import { Request, Response } from 'express'


const mockResponse = () => {
    const res = {} as Response
    res.send = jest.fn().mockReturnValue(res)
    res.status = jest.fn().mockReturnValue(res)
    return res
}

describe('Student Controller', () => {
    describe('Request get All students', () => {
        const allStudents = [
            {
                id: 1,
                name: 'Rashmi Navodya',
                gender: 'Female',
                address: 'galle',
                mobileNo: '0772463268',
                dateOfBirth: new Date('2000-11-15'),
                age: 22,
            },
        ]

        const req = {} as Request
        const res = mockResponse()

        test('Get All students success', async () => {
            const spyGetAllStudents = jest
                .spyOn(studentServices, 'getAllStudents')
                .mockResolvedValue(allStudents)

            await requestGetAllStudents(req, res)
            expect(res.send).toHaveBeenCalledWith(allStudents)
            spyGetAllStudents.mockRestore()
        })

        test('Get All students failed', async () => {
            const spyGetAllStudents = jest
                .spyOn(studentServices, 'getAllStudents')
                .mockRejectedValue(null)

            await requestGetAllStudents(req, res)
            expect(res.status).toHaveBeenCalledWith(400)
            spyGetAllStudents.mockRestore()
        })
    })

    describe('Request add students', () => {
        const student = {
            id: 1,
            name: 'Lasan Chanuka',
            gender: 'Male',
            address: 'galle',
            mobileNo: '0772463268',
            dateOfBirth: new Date('2000-11-15'),
            age: 22,
        }

        const req = {
            body: {
                name: 'Lasan Chanuka',
                gender: 'Male',
                address: 'galle',
                mobileNo: '0772463268',
                dateOfBirth: new Date('2000-11-15'),
                age: 22,
            },
        } as Request

        const res = mockResponse()

        test('Add student success', async () => {
            const spyAddStudent = jest
                .spyOn(studentServices, 'addStudent')
                .mockResolvedValue(student)
            await requestAddStudent(req, res)

            expect(res.send).toHaveBeenCalledWith(student)
            spyAddStudent.mockRestore()
        })

        
        test('Add student failed', async () => {
            const spyAddStudent = jest
                .spyOn(studentServices, 'addStudent')
                .mockRejectedValue(null)
            await requestAddStudent(req, res)

            expect(res.status).toHaveBeenCalledWith(400)
            spyAddStudent.mockRestore()
        })
    })

    describe('Request update student', () => {
        const student = {
            id: 1,
            name: 'Lasan Chanuka',
            gender: 'Male',
            address: 'Matara',
            mobileNo: '0772463268',
            dateOfBirth: new Date('2000-11-15'),
            age: 22,
        }

        const req = {
            body: {
                id: 1,
                name: 'Lasan Chanuka',
                gender: 'Male',
                address: 'Matara',
                mobileNo: '0772463268',
                dateOfBirth: new Date('2000-11-15'),
                age: 22,
            },
        } as Request

        const res = mockResponse()

        test('Update student success', async () => {
            const spyUpdateStudent = jest
                .spyOn(studentServices, 'updateStudent')
                .mockResolvedValue(student)
            await requestUpdateStudent(req, res)

            expect(res.send).toHaveBeenCalledWith(student)
            spyUpdateStudent.mockRestore()
        })

        test('Update student failed', async () => {
            const spyUpdateStudent = jest
                .spyOn(studentServices, 'updateStudent')
                .mockRejectedValue(null)
            await requestUpdateStudent(req, res)

            expect(res.status).toHaveBeenCalledWith(400)
            spyUpdateStudent.mockRestore()
        })
    })

    describe('Request delete student', () => {
        const student = {
            id: 1,
            name: 'Lasan Chanuka',
            gender: 'Male',
            address: 'Matara',
            mobileNo: '0772463268',
            dateOfBirth: new Date('2000-11-15'),
            age: 22,
        }

        const id =  1
         
          
        const req = {
            params:{
                id: id,
            }
        } as any

        const res = mockResponse()

        test('Delete student success', async () => {
            const spyDeleteStudent = jest
                .spyOn(studentServices, 'deleteStudent')
                .mockResolvedValue(id)
            await requestDeleteStudent(req, res)

            expect(res.send).toHaveBeenCalledWith(id)
            spyDeleteStudent.mockRestore()
        })

        test('Delete student failed', async () => {
            const spyDeleteStudent = jest
                .spyOn(studentServices, 'deleteStudent')
                .mockRejectedValue(null)
            await requestDeleteStudent(req, res)

            expect(res.status).toHaveBeenCalledWith(400)
            spyDeleteStudent.mockRestore()
        })
    })
})

import {
    addStudent,
    deleteStudent,
    getAllStudents,
    updateStudent,
} from '../../services/studentServices'
import { Student } from '../../models/student'
import { appDataSource } from '../../configs/dataSourceConfig'

describe('Student', () => {
    const studentRepo = appDataSource.manager
    describe('Get All students', () => {
        const allStudents = [
            {
                id: 1,
                name: 'Lasan Chanuka',
                gender: 'Male',
                address: 'galle',
                mobileNo: '0772463268',
                dateOfBirth: new Date('2000-11-15'),
                age: 22,
            },
        ]
        test('Get All students success', async () => {
            studentRepo.getRepository(Student).find = jest
                .fn()
                .mockResolvedValue(allStudents)
            const data = await getAllStudents()
            expect(data).toEqual(allStudents)
        })

        test('Get all students failed ', async () => {
            studentRepo.getRepository(Student).find = jest
                .fn()
                .mockRejectedValue(null)
            const data = await getAllStudents()
            expect(data).toEqual({
                err: 'Can not fetch students.Error occured',
            })
        })
    })

    describe('Add student', () => {
        const student: Student = {
            id: 1,
            name: 'Lasan',
            gender: 'Male',
            address: 'galle',
            mobileNo: '0772463268',
            dateOfBirth: new Date('2000-11-15'),
            age: 22,
        }

        test('Add new student success', async () => {
            studentRepo.insert = jest.fn().mockResolvedValue(student)
            const data = await addStudent(student)
            expect(data).toEqual(student)
        })

        test('Add new student failed ', async () => {
            studentRepo.insert = jest.fn().mockRejectedValue(null)
            const data = await addStudent(student)
            expect(data).toEqual({
                err: 'Add student failed.Error occured',
            })
        })
    })

    describe('Update student', () => {
        const student: Student = {
            id: 1,
            name: 'Lasan Chanuka',
            gender: 'Male',
            address: 'galle',
            mobileNo: '0772463268',
            dateOfBirth: new Date('2000-11-15'),
            age: 22,
        }

        test('Update student success', async () => {
            studentRepo.update = jest.fn().mockResolvedValue(student)
            const data = await updateStudent(student)
            expect(data).toEqual(student)
        })

        test('Update student failed ', async () => {
            studentRepo.update = jest.fn().mockRejectedValue(null)
            const data = await updateStudent(student)
            expect(data).toEqual({
                err: 'Failed to update student.Error occured',
            })
        })
    })

    describe('Delete student', () => {
        const id = '1'
        test('Delete student success', async () => {
            studentRepo.delete = jest.fn().mockResolvedValue(id)
            const data = await deleteStudent(id)
            expect(data).toEqual(id)
        })

        test('Delete student failed ', async () => {
            studentRepo.delete = jest.fn().mockRejectedValue(null)
            const data = await deleteStudent(id)
            expect(data).toEqual({
                err: 'Can not delete student.Error occured',
            })
        })
    })
})

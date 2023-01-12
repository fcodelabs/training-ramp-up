import { requestGetAllStudents } from '../../controllers/studentController'
import * as studentServices from '../../services/studentServices'
import { Request, Response } from 'express'

const mockResponse = () => {
    const res = {} as Response
    res.send = jest.fn().mockReturnValue(res)
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

        const req={} as Request
        const res=mockResponse()

        test('Get All students success', async () => {

            const spyGetAllStudents=jest.spyOn(studentServices, "getAllStudents").mockResolvedValue(allStudents);
            await requestGetAllStudents(req,res)
       

            expect(res.send).toBeCalledWith(allStudents)
            spyGetAllStudents.mockRestore()
        })

    })

    // describe('Request add students', () => {
    //     const student = {
    //         id: 1,
    //         name: 'Lasan Chanuka',
    //         gender: 'Male',
    //         address: 'galle',
    //         mobileNo: '0772463268',
    //         dateOfBirth: new Date('2000-11-15'),
    //         age: 22,
    //     }

    //     const req = {
    //         body: {
    //             name: 'Lasan Chanuka',
    //             gender: 'Male',
    //             address: 'galle',
    //             mobileNo: '0772463268',
    //             dateOfBirth: new Date('2000-11-15'),
    //             age: 22,
    //         },
    //     } as Request

    //     const res = mockResponse()

    //     test('Add student success', async () => {
    //         const spyGetAllStudents = jest
    //             .spyOn(studentServices, 'addStudent')
    //             .mockResolvedValue(student)
    //         const data = await requestGetAllStudents(req, res)
    //         console.log(data)

    //         expect(data).toEqual(student)
    //         spyGetAllStudents.mockRestore()
    //     })
    // })
})

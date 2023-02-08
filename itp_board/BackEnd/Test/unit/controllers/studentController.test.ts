import {
    createStudent,
    deleteStudentById,
    getAllStudents,
    updateStudentById
} from "../../../src/controllers/studentController";
import {studentData} from '../../dummy';
import {NextFunction, Request, Response} from "express";
import * as studentServices from "../../../src/services/studentServices";
import {describe} from "node:test";

jest.mock('../../../src/configs/db.config', () => (
        {
            AppDataSource: {
                getRepository: jest.fn().mockReturnValue({
                    findOneBy: jest.fn(),
                    find: jest.fn(),
                    save: jest.fn(),
                    remove: jest.fn(),
                }),
            },
        }
    )
);

describe("Get student data", () => {
    const req = {} as Request;
    const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
    } as unknown as Response;
    const next = jest.fn() as NextFunction;

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it(
        "Should response with list of student data",
        async () => {
            jest.spyOn(studentServices, 'fetchAll').mockResolvedValueOnce(studentData);
            await getAllStudents(req, res, next);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(studentData);
        }
    );
    it(
        "res.json and res.status Should be called exactly 1 time",
        async () => {
            jest.spyOn(studentServices, "fetchAll").mockResolvedValueOnce(studentData);
            await getAllStudents(req, res, next);
            expect(res.status).toHaveBeenCalledTimes(1)
            expect(res.json).toHaveBeenCalledTimes(1)
        }
    )

    it(
        "Error should return to next if there is error in fetchAll function",
        async () => {
            const error = new Error('Error in findAll');
            jest.spyOn(studentServices, "fetchAll").mockRejectedValueOnce(error);
            await getAllStudents(req, res, next);
            expect(next).toHaveBeenCalledTimes(1);
            expect(next).toHaveBeenCalledWith(error);
        }
    );

});

describe('Add New Student', () => {
    const req = {} as Request
    req.body = {
        name: 'shane',
        gender: 'male',
        address: 'homagama',
        mobileNo: '0112748768',
        dateOfBirth: new Date('1996-09-16'),
    };
    const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
    } as unknown as Response
    const next = jest.fn() as NextFunction
    beforeEach(
        () => {
            jest.clearAllMocks();
        }
    );

    it(
        "Should return student object with id",
        async () => {
            jest.spyOn(studentServices, "create").mockResolvedValueOnce({id: 10, ...req.body});
            await createStudent(req, res, next);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({id: 10, ...req.body});
        }
    )

    it(
        "Should call res.json and res.status exactly 1 time.",
        async () => {
            jest.spyOn(studentServices, "create").mockResolvedValueOnce({id: 10, ...req.body});
            await createStudent(req, res, next);
            expect(res.status).toHaveBeenCalledTimes(1);
            expect(res.json).toHaveBeenCalledTimes(1);
        }
    );

    it(
        "Error should return to next if there is error in create function",
        async () => {
            const error = new Error('Error in create');
            jest.spyOn(studentServices, "create").mockRejectedValueOnce(error);
            await createStudent(req, res, next);
            expect(next).toHaveBeenCalledTimes(1);
            expect(next).toHaveBeenCalledWith(error);
        }
    );
})

describe(
    "Delete given student",
    () => {
        const req = {} as Request;
        req.params = {id:'10'};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        } as unknown as Response;
        const next = jest.fn() as NextFunction;
        beforeEach(
            () => {
                jest.clearAllMocks();
            }
        );
        it(
           "Should delete the student which is corresponding to given id",
            async () => {
                const response = {
                    "raw": [],
                    "affected": 1
                }
                jest.spyOn(studentServices,"remove").mockResolvedValueOnce(response);
                await deleteStudentById(req,res,next);
                expect(res.status).toHaveBeenCalledWith(200);
                expect(res.json).toHaveBeenCalledWith(response);
            }
        );
        it(
            "Should call res.json and res.status is called exactly 1 time",
            async ()=>{
                const response = {
                    "raw": [],
                    "affected": 1
                }
                jest.spyOn(studentServices,"remove").mockResolvedValueOnce(response);
                await deleteStudentById(req,res,next);
                expect(res.status).toHaveBeenCalledTimes(1);
                expect(res.json).toHaveBeenCalledTimes(1);
            }
        );

        it(
            "Should call next with error when there is an error in remove function",
            async ()=>{
                const error = new Error('Error in remove')
                jest.spyOn(studentServices, 'remove').mockRejectedValue(error)
                await deleteStudentById(req,res,next);
                expect(res.status).toHaveBeenCalledTimes(0);
                expect(res.json).toHaveBeenCalledTimes(0);
                expect(next).toHaveBeenCalledWith(error);
            }
        )

    }
)

describe(
    "Update student",
    ()=>{

        const req = {} as Request;
        req.body = {
            id:10,
            name:'kavindu',
            address:'homagama'
        }
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        } as unknown as Response;
        const next = jest.fn() as NextFunction;
        beforeEach(
            () => {
                jest.clearAllMocks();
            }
        );

        it(
            "Should response with affected number or rows with 200 status code",
            async ()=>{
                const expectedResponse = { generatedMaps: [], raw: [], affected: 1 };
                jest.spyOn(studentServices,'update').mockResolvedValueOnce(expectedResponse);
                await updateStudentById(req,res,next)
                expect(res.status).toHaveBeenCalledWith(200);
                expect(res.json).toHaveBeenCalledWith(expectedResponse);
            }
        )

        it(
            "Should call res.status and res.json exactly 1 time",
            async ()=>{
                const expectedResponse = { generatedMaps: [], raw: [], affected: 1 };
                jest.spyOn(studentServices,'update').mockResolvedValueOnce(expectedResponse);
                await updateStudentById(req,res,next)
                expect(res.status).toHaveBeenCalledTimes(1);
                expect(res.json).toHaveBeenCalledTimes(1);
            }
        )

        it(
            "Should call next with error when there is error update method",
            async ()=>{

                const error = new Error('Error in update');
                jest.spyOn(studentServices,'update').mockRejectedValueOnce(error);
                await updateStudentById(req,res,next)
                expect(res.status).toHaveBeenCalledTimes(0);
                expect(res.json).toHaveBeenCalledTimes(0);
                expect(next).toHaveBeenCalledTimes(1);
                expect(next).toHaveBeenCalledWith(error);
            }
        )
    }
)


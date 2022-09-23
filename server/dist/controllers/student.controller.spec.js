"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const student_controller_1 = require("./student.controller");
const StudentService = __importStar(require("../services/student.service"));
const Student_1 = require("../models/Student");
describe("StudentController", () => {
    //Get All Students Tests
    describe("getAll", () => {
        const getStudentsSuccess = {
            students: [
                {
                    id: 1,
                    name: "Ishanka",
                    address: "Kandy",
                    gender: Student_1.Gender.Male,
                    mobileNo: 714942987,
                    age: 27,
                    dob: new Date("1995-03-16 00:00:00")
                },
                {
                    id: 2,
                    name: "Sara",
                    address: "Colombo",
                    gender: Student_1.Gender.Female,
                    mobileNo: 714542947,
                    age: 27,
                    dob: new Date("1995-04-17 00:00:00")
                },
            ]
        };
        const getStudentsError = {
            error: "Couldn't retrieve student data!"
        };
        const request = {};
        const response = {
            status: jest.fn((x) => x),
            json: jest.fn((x) => x)
        };
        //positive test
        test("Should send a status of 200", () => __awaiter(void 0, void 0, void 0, function* () {
            const spy = jest.spyOn(StudentService, "getStudents").mockResolvedValue(getStudentsSuccess);
            yield (0, student_controller_1.getAll)(request, response);
            expect(response.status).toHaveBeenCalledWith(200);
            expect(response.json).toHaveBeenCalledWith({ message: "Successfully retrieved data!", students: getStudentsSuccess.students });
            spy.mockRestore();
        }));
        //negative test
        test("Should send a status of 400", () => __awaiter(void 0, void 0, void 0, function* () {
            const spy = jest.spyOn(StudentService, "getStudents").mockResolvedValue(getStudentsError);
            yield (0, student_controller_1.getAll)(request, response);
            expect(response.status).toHaveBeenCalledWith(400);
            expect(response.json).toHaveBeenCalledWith({
                message: "Request Failed",
                error: "Couldn't retrieve student data!",
            });
            spy.mockRestore();
        }));
    });
    //Add a Student Tests
    describe("addOne", () => {
        // getting students success result from service
        const addStudentSuccess = {
            message: "Student added successfully!",
            data: {
                id: 1,
                name: "Ishanka",
                address: "Kandy",
                gender: Student_1.Gender.Male,
                mobileNo: 714942987,
                age: 27,
                dob: new Date("1995-03-16 00:00:00")
            },
        };
        const addStudentError = {
            error: "Failed to add student!"
        };
        const request = {
            body: {
                name: "Ishanka",
                address: "Kandy",
                gender: Student_1.Gender.Male,
                mobileNo: 714942987,
                age: 0,
                dob: "1995-03-16 00:00:00"
            }
        };
        const response = {
            status: jest.fn((x) => x),
            json: jest.fn((x) => x)
        };
        //positive test
        test("Student creation success, should send a status of 200", () => __awaiter(void 0, void 0, void 0, function* () {
            const spy = jest.spyOn(StudentService, "addStudent").mockResolvedValue(addStudentSuccess);
            yield (0, student_controller_1.addOne)(request, response);
            expect(response.status).toHaveBeenCalledWith(200);
            expect(response.json).toHaveBeenCalledWith({ message: "Student has been added successfully!", student: addStudentSuccess.data });
            spy.mockRestore();
        }));
        //negative test
        test("Student creation failed, should send a status of 400", () => __awaiter(void 0, void 0, void 0, function* () {
            const spy = jest.spyOn(StudentService, "addStudent").mockResolvedValue(addStudentError);
            yield (0, student_controller_1.addOne)(request, response);
            expect(response.status).toHaveBeenCalledWith(400);
            expect(response.json).toHaveBeenCalledWith({
                message: "Request Failed",
                error: addStudentError.error,
            });
            spy.mockRestore();
        }));
    });
    //Update a Student Tests
    describe("updateOne", () => {
        const updateStudentSuccess = {
            message: "Successfully updated the student!",
            data: {
                id: 1,
                name: "Ishanka",
                address: "Kandy",
                gender: Student_1.Gender.Male,
                mobileNo: 714942987,
                age: 27,
                dob: new Date("1995-03-16 00:00:00")
            },
        };
        const updateStudentError = {
            error: "Student not found!"
        };
        const request = {
            params: {
                id: "1"
            },
            body: {
                name: "Ishanka",
                address: "Kandy",
                gender: Student_1.Gender.Male,
                mobileNo: 714942987,
                age: 27,
                dob: "1995-03-16 00:00:00"
            }
        };
        const response = {
            status: jest.fn((x) => x),
            json: jest.fn((x) => x)
        };
        //positive test
        test("Student update success, should send a status of 200", () => __awaiter(void 0, void 0, void 0, function* () {
            const spy = jest.spyOn(StudentService, "updateStudent").mockResolvedValue(updateStudentSuccess);
            yield (0, student_controller_1.updateOne)(request, response);
            expect(response.status).toHaveBeenCalledWith(200);
            expect(response.json).toHaveBeenCalledWith({ message: "Successfully updated the student", updatedStudent: updateStudentSuccess.data });
            spy.mockRestore();
        }));
        //negative test
        test("Student update failed, should send a status of 400", () => __awaiter(void 0, void 0, void 0, function* () {
            const spy = jest.spyOn(StudentService, "updateStudent").mockResolvedValue(updateStudentError);
            yield (0, student_controller_1.updateOne)(request, response);
            expect(response.status).toHaveBeenCalledWith(400);
            expect(response.json).toHaveBeenCalledWith({
                message: "Request Failed",
                error: updateStudentError.error,
            });
            spy.mockRestore();
        }));
    });
    //Delete a student Tests
    describe("deleteOne", () => {
        const deleteStudentSuccess = {
            message: "Student removed successfully!",
        };
        const deleteStudentError = {
            error: "Student doesn't exist!"
        };
        const request = {
            params: {
                id: "1"
            },
        };
        const response = {
            status: jest.fn((x) => x),
            json: jest.fn((x) => x)
        };
        //positive test
        test("Student deletion success, should send a status of 200", () => __awaiter(void 0, void 0, void 0, function* () {
            const spy = jest.spyOn(StudentService, "deleteStudent").mockResolvedValue(deleteStudentSuccess);
            yield (0, student_controller_1.deleteOne)(request, response);
            expect(response.status).toHaveBeenCalledWith(200);
            expect(response.json).toHaveBeenCalledWith({ message: "Successfully deleted the student", id: 1 });
            spy.mockRestore();
        }));
        //negative test
        test("Student deletion failed, should send a status of 400", () => __awaiter(void 0, void 0, void 0, function* () {
            const spy = jest.spyOn(StudentService, "deleteStudent").mockResolvedValue(deleteStudentError);
            yield (0, student_controller_1.deleteOne)(request, response);
            expect(response.status).toHaveBeenCalledWith(400);
            expect(response.json).toHaveBeenCalledWith({
                message: "Request Failed",
                error: deleteStudentError.error,
            });
            spy.mockRestore();
        }));
    });
});

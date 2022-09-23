"use strict";
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
const student_service_1 = require("./student.service");
const Student_1 = require("../models/Student");
describe("StudentService", () => {
    //Get All Students Service Tests
    describe("getStudents", () => {
        const allStudents = [
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
            }
        ];
        //positive test
        test("Getting students success, should return all students", () => __awaiter(void 0, void 0, void 0, function* () {
            student_service_1.studentRepository.find = jest.fn().mockReturnValue(allStudents);
            const res = yield (0, student_service_1.getStudents)();
            expect(res).toEqual({ students: allStudents });
        }));
        //negative test
        test("Getting students failed, should return an error message", () => __awaiter(void 0, void 0, void 0, function* () {
            student_service_1.studentRepository.find = jest.fn().mockImplementationOnce(() => { throw new Error('Not Found!'); });
            const res = yield (0, student_service_1.getStudents)();
            expect(res).toEqual({ error: "Couldn't retrieve student data!" });
        }));
    });
    //Add Student Service Tests
    describe("addStudent", () => {
        const student = {
            name: "Sara",
            address: "Colombo",
            gender: Student_1.Gender.Female,
            mobileNo: 714542947,
            age: 0,
            dob: "1995-04-17 00:00:00"
        };
        //positive test
        test("Add student success, should return the new student", () => __awaiter(void 0, void 0, void 0, function* () {
            student_service_1.studentRepository.save = jest.fn().mockReturnValue(Object.assign(Object.assign({}, student), { id: 2, age: 27 }));
            const res = yield (0, student_service_1.addStudent)(student);
            expect(res).toEqual({ message: "Student added successfully!", data: Object.assign(Object.assign({}, student), { id: 2, age: 27 }) });
        }));
        //negative test
        test("Add student failed, should return an error message", () => __awaiter(void 0, void 0, void 0, function* () {
            student_service_1.studentRepository.save = jest.fn().mockImplementationOnce(() => { throw new Error('Failed to create student entity!'); });
            const res = yield (0, student_service_1.addStudent)(student);
            expect(res).toEqual({ error: 'Failed to create student entity!' });
        }));
    });
    //Update Student Service Tests
    describe("updateStudent", () => {
        const student = {
            id: 2,
            name: "Sarah",
            address: "Colombo",
            gender: Student_1.Gender.Female,
            mobileNo: 714542947,
            age: 0,
            dob: "1994-04-17 00:00:00"
        };
        //positive test
        test("Update student success, should return the updated student", () => __awaiter(void 0, void 0, void 0, function* () {
            student_service_1.studentRepository.findOneBy = jest.fn().mockReturnValue(Object.assign(Object.assign({}, student), { dob: new Date("1994-05-17 00:00:00"), name: "sara", age: 27 }));
            student_service_1.studentRepository.save = jest.fn().mockReturnValue(Object.assign(Object.assign({}, student), { dob: new Date("1994-04-17 00:00:00"), name: "sarah", age: 28 }));
            const res = yield (0, student_service_1.updateStudent)(2, student);
            expect(res).toEqual({ message: "Successfully updated the student!", data: Object.assign(Object.assign({}, student), { dob: new Date("1994-04-17 00:00:00"), name: "sarah", age: 28 }) });
        }));
        //negative test
        test("Update student failed, should return an error message", () => __awaiter(void 0, void 0, void 0, function* () {
            student_service_1.studentRepository.findOneBy = jest.fn().mockImplementationOnce(() => { throw new Error('Not Found!'); });
            student_service_1.studentRepository.save = jest.fn().mockImplementationOnce(() => { throw new Error('Failed to create student entity!'); });
            const res = yield (0, student_service_1.updateStudent)(2, student);
            expect(res).toEqual({ error: 'Failed to update student!' });
        }));
    });
    //Delete Student Service Tests
    describe("deleteStudent", () => {
        const id = 2;
        const student = {
            id: 2,
            name: "Sarah",
            address: "Colombo",
            gender: Student_1.Gender.Female,
            mobileNo: 714542947,
            age: 28,
            dob: new Date("1994-04-17 00:00:00")
        };
        //positive test
        test("Delete success, should return success message", () => __awaiter(void 0, void 0, void 0, function* () {
            student_service_1.studentRepository.findOneBy = jest.fn().mockReturnValue(student);
            student_service_1.studentRepository.remove = jest.fn().mockReturnValue(student);
            const res = yield (0, student_service_1.deleteStudent)(2);
            expect(res).toEqual({ message: "Student removed successfully!" });
        }));
        //negative test
        test("Delete failed, should return an error message", () => __awaiter(void 0, void 0, void 0, function* () {
            student_service_1.studentRepository.findOneBy = jest.fn().mockImplementationOnce(() => undefined);
            student_service_1.studentRepository.remove = jest.fn().mockReturnValue(student);
            const res = yield (0, student_service_1.deleteStudent)(2);
            expect(res).toEqual({ error: "Student doesn't exist!" });
        }));
    });
});

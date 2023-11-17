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
exports.deleteStudent = exports.updateStudent = exports.createStudent = exports.getStudent = exports.listStudents = void 0;
const student_1 = require("../entity/student");
const listStudents = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield student_1.Student.find();
});
exports.listStudents = listStudents;
const getStudent = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return student_1.Student.findOneBy({
        id: id,
    });
});
exports.getStudent = getStudent;
const createStudent = (student) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, gender, address, mobileNo, dateOfBirth, age } = student;
    const newStudent = new student_1.Student();
    newStudent.name = name;
    newStudent.gender = gender;
    newStudent.address = address;
    newStudent.mobileNo = mobileNo;
    newStudent.dateOfBirth = dateOfBirth;
    newStudent.age = age;
    return newStudent.save();
});
exports.createStudent = createStudent;
const updateStudent = (student, id) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, gender, address, mobileNo, dateOfBirth, age } = student;
    const studentToUpdate = yield student_1.Student.findOneBy({ id: id });
    if (!studentToUpdate) {
        throw new Error("Student not found");
    }
    studentToUpdate.name = name;
    studentToUpdate.gender = gender;
    studentToUpdate.address = address;
    studentToUpdate.mobileNo = mobileNo;
    studentToUpdate.dateOfBirth = dateOfBirth;
    studentToUpdate.age = age;
    return studentToUpdate.save();
});
exports.updateStudent = updateStudent;
const deleteStudent = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const studentToDelete = yield student_1.Student.findOneBy({ id: id });
    if (!studentToDelete) {
        throw new Error("Student not found");
    }
    studentToDelete.remove();
});
exports.deleteStudent = deleteStudent;

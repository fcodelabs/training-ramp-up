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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateStudent = exports.getStudents = exports.deleteStudent = exports.addStudent = void 0;
const Student_1 = require("../models/Student");
const db_1 = __importDefault(require("../util/db"));
const calcAge = (date) => {
    let today = new Date();
    let age = today.getFullYear() - date.getFullYear();
    return age;
};
function addStudent(data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const dob = new Date(data.dob);
            const age = calcAge(dob);
            const student = new Student_1.Student();
            student.name = data.name;
            student.gender = data.gender;
            student.address = data.address;
            student.dob = dob;
            student.mobileNo = data.mobileNo;
            student.age = age;
            const studentRepository = db_1.default.getRepository(Student_1.Student);
            const newStudent = yield studentRepository.save(student);
            if (!newStudent) {
                return { message: "Faild to add student !" };
            }
            return { message: "Student added successfully !", data: newStudent };
        }
        catch (error) {
            return { error };
        }
    });
}
exports.addStudent = addStudent;
function deleteStudent(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const studentRepository = db_1.default.getRepository(Student_1.Student);
            const studentToRemove = yield studentRepository.findOneBy({ id });
            if (!studentToRemove) {
                return { message: "Student doesn't exist !" };
            }
            yield studentRepository.remove(studentToRemove);
            return { message: "Student removed successfully !" };
        }
        catch (error) {
            return { error };
        }
    });
}
exports.deleteStudent = deleteStudent;
function getStudents() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const studentRepository = db_1.default.getRepository(Student_1.Student);
            const allStudents = yield studentRepository.find();
            return { students: allStudents };
        }
        catch (error) {
            return { error };
        }
    });
}
exports.getStudents = getStudents;
function updateStudent(id, data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const studentRepository = db_1.default.getRepository(Student_1.Student);
            const studentToUpdate = yield studentRepository.findOneBy({ id });
            if (!studentToUpdate) {
                return { message: "Student not found !" };
            }
            const dob = new Date(data.dob);
            const age = calcAge(dob);
            const updatedStudent = yield studentRepository.save(Object.assign(Object.assign(Object.assign({}, studentToUpdate), data), { age, dob }));
            if (!updatedStudent) {
                return { message: "Failed to update student !" };
            }
            return { message: "Successfully updated the student !", data: updatedStudent };
        }
        catch (error) {
            return { error };
        }
    });
}
exports.updateStudent = updateStudent;

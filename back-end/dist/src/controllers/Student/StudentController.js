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
exports.deleteStudent = exports.updateStudent = exports.addStudent = exports.getAllStudents = void 0;
const StudentService_1 = require("../../services/Student/StudentService");
const getAllStudents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const students = (0, StudentService_1.getAllStudentsService)();
        res.send(students);
    }
    catch (err) {
        res.send(`Error: ${err}`);
    }
});
exports.getAllStudents = getAllStudents;
const addStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = (0, StudentService_1.addStudentService)(req.body);
        res.send(response);
    }
    catch (err) {
        res.send(`Error: ${err}`);
    }
});
exports.addStudent = addStudent;
const updateStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = (0, StudentService_1.updateStudentService)(req.body);
        res.send(response);
    }
    catch (err) {
        res.send(`Error: ${err}`);
    }
});
exports.updateStudent = updateStudent;
const deleteStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const studentId = parseInt(req.params.Id);
        const response = (0, StudentService_1.deleteStudentService)(studentId);
        res.send(response);
    }
    catch (err) {
        res.send(`Error: ${err}`);
    }
});
exports.deleteStudent = deleteStudent;

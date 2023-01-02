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
exports.deleteStudent = exports.patchStudent = exports.addStudent = exports.getAllStudents = void 0;
const server_1 = require("../../server");
const StudentService_1 = require("../services/StudentService");
// get all students controller
const getAllStudents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const students = yield (0, StudentService_1.getAllStudentsService)().catch((err) => {
            res.status(500);
            res.json(err);
            return;
        });
        res.status(200);
        res.json(students);
    }
    catch (err) {
        res.status(500);
        res.json(err);
    }
});
exports.getAllStudents = getAllStudents;
// add student controller
const addStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, StudentService_1.addStudentService)(req.body);
        server_1.io.emit('message', 'Student ' + req.body.name + ' added');
        res.status(200);
        res.json({ message: 'Student added successfully' });
    }
    catch (err) {
        res.status(500);
        res.json(err);
    }
});
exports.addStudent = addStudent;
// patch student controller
const patchStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const studentId = parseInt(req.params.id);
        const student = yield (0, StudentService_1.findStudentService)(studentId);
        if (student) {
            (0, StudentService_1.mergeStudentService)(student, req.body);
            const results = yield (0, StudentService_1.saveStudentService)(student);
            server_1.io.emit('message', 'Student Id : ' + req.body.id + ' updated');
            return res.send(results);
        }
    }
    catch (err) {
        res.status(500);
        res.json(err);
    }
});
exports.patchStudent = patchStudent;
// delete student controller
const deleteStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const studentId = parseInt(req.params.id);
        yield (0, StudentService_1.deleteStudentService)(studentId);
        server_1.io.emit('message', 'Student Id : ' + studentId + ' deleted');
        res.status(200);
        res.json({ message: 'Student deleted successfully' });
    }
    catch (err) {
        res.status(500);
        res.json(err);
    }
});
exports.deleteStudent = deleteStudent;

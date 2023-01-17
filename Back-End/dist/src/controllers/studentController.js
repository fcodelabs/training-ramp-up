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
const studentService_1 = require("../services/studentService");
// get all students controller
const getAllStudents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const students = yield (0, studentService_1.getAllStudentsService)();
        res.status(200).send(students);
    }
    catch (err) {
        res.status(400).send({ err: 'students get failed' });
    }
});
exports.getAllStudents = getAllStudents;
// add student controller
const addStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, studentService_1.addStudentService)(req.body);
        server_1.io.emit('message', 'Student ' + req.body.name + ' added');
        res.status(200).send({ message: 'Student added successfully' });
    }
    catch (err) {
        res.status(400).send({ err: 'not success' });
    }
});
exports.addStudent = addStudent;
// patch student controller
const patchStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('Hello Update');
        const students = yield (0, studentService_1.updateStudent)(req.body);
        res.send(students);
        server_1.io.emit('notification', 'The with id ' + req.body.id + ' student has been updated');
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
exports.patchStudent = patchStudent;
// delete student controller
const deleteStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const studentId = parseInt(req.params.id);
        yield (0, studentService_1.deleteStudentService)(studentId);
        server_1.io.emit('message', 'Student Id : ' + studentId + ' deleted');
        res.status(200);
        res.json({ message: 'Student deleted successfully' });
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
exports.deleteStudent = deleteStudent;

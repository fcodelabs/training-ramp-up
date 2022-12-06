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
exports.deleteStudent = exports.upsertStudent = exports.getAllStudents = void 0;
const studentService_1 = require("../services/studentService");
const getAllStudents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const students = yield (0, studentService_1.getAllStudentsService)().catch((err) => {
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
const upsertStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const studentRepository = yield (0, studentService_1.upsertStudentService)(req.body);
        res.status(200);
        res.json(studentRepository);
    }
    catch (err) {
        res.status(500);
        res.json(err);
    }
});
exports.upsertStudent = upsertStudent;
const deleteStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, studentService_1.deleteStudentService)(req.params.id);
        res.status(200);
        res.json(result);
    }
    catch (err) {
        res.status(500);
        res.json(err);
    }
});
exports.deleteStudent = deleteStudent;

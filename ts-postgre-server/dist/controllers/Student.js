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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteStudent = exports.updateStudent = exports.createStudent = exports.getStudents = void 0;
const express_validator_1 = require("express-validator");
const studentService = __importStar(require("../services/Student"));
const getStudents = async (_req, res) => {
    try {
        const students = await studentService.getStudentsService();
        return res.status(200).json(students);
    }
    catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.getStudents = getStudents;
const createStudent = async (req, res) => {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            const errorMessages = errors.array().map(error => error.msg);
            return res.status(400).json({ errors: errorMessages });
        }
        const newStudent = await studentService.createStudentService(req.body);
        return res.status(200).json(newStudent);
    }
    catch (error) {
        return res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
};
exports.createStudent = createStudent;
const updateStudent = async (req, res) => {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            const errorMessages = errors.array().map(error => error.msg);
            return res.status(400).json({ errors: errorMessages });
        }
        const { id } = req.params;
        const updatedStudent = await studentService.updateStudentService(id, req.body);
        return res.status(200).json(updatedStudent);
    }
    catch (error) {
        return res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
};
exports.updateStudent = updateStudent;
const deleteStudent = async (req, res) => {
    try {
        const { id } = req.params;
        const message = await studentService.deleteStudentService(id);
        return res.status(200).json({ message });
    }
    catch (error) {
        return res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
};
exports.deleteStudent = deleteStudent;
//# sourceMappingURL=Student.js.map
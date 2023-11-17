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
exports.deleteStudent = exports.updateStudent = exports.createStudent = exports.getStudent = exports.getStudents = void 0;
const express_validator_1 = require("express-validator");
const StudentService = __importStar(require("../services/student.services"));
const __1 = require("..");
// GET: List of all Students
const getStudents = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const students = yield StudentService.listStudents();
        return response.status(200).json(students);
    }
    catch (error) {
        return response.status(500).json(error.message);
    }
});
exports.getStudents = getStudents;
// GET: A single Student by ID
const getStudent = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(request.params.id, 10);
    try {
        const student = yield StudentService.getStudent(id);
        if (student) {
            return response.status(200).json(student);
        }
        return response.status(404).json("Student could not be found");
    }
    catch (error) {
        return response.status(500).json(error.message);
    }
});
exports.getStudent = getStudent;
// POST: Create a Student
const createStudent = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(request);
    if (!errors.isEmpty()) {
        return response.status(400).json({ errors: errors.array() });
    }
    try {
        const student = request.body;
        const newStudent = yield StudentService.createStudent(student);
        __1.io.emit("Notification", {
            message: "A new student has been created",
        }, console.log("A new student has been created"));
        return response.status(201).json(newStudent);
    }
    catch (error) {
        return response.status(500).json(error.message);
    }
});
exports.createStudent = createStudent;
// PUT: Updating a Student
const updateStudent = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(request);
    if (!errors.isEmpty()) {
        return response.status(400).json({ errors: errors.array() });
    }
    const id = parseInt(request.params.id, 10);
    try {
        const student = request.body;
        const updateStudent = yield StudentService.updateStudent(student, id);
        __1.io.emit("Notification", {
            message: "Student has been updated",
        }, console.log("Student has been updated"));
        return response.status(200).json(updateStudent);
    }
    catch (error) {
        return response.status(500).json(error.message);
    }
});
exports.updateStudent = updateStudent;
// DELETE: Delete a student based on the id
const deleteStudent = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(request.params.id, 10);
    try {
        yield StudentService.deleteStudent(id);
        __1.io.emit("Notification", {
            message: "Student has been deleted",
        }, console.log("Student has been deleted"));
        return response.status(204).json("Student has been successfully deleted");
    }
    catch (error) {
        return response.status(500).json(error.message);
    }
});
exports.deleteStudent = deleteStudent;

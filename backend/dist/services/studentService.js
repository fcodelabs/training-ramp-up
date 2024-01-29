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
const Student_1 = require("../models/Student");
const index_1 = require("../index");
const StudentService = {
    addNewStudentService: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            console.log("hello 1");
            const studentRepository = index_1.AppDataSource.getRepository(Student_1.Student);
            // Create a new student instance with data from the request body
            console.log("hello 2");
            const newStudent = studentRepository.create(req.body);
            console.log("hello 3");
            console.log(req.body);
            console.log(newStudent);
            // Save the new student to the database
            const savedStudent = yield studentRepository.save(newStudent);
            // Send the saved student data as the response
            return res.status(201).json(savedStudent);
        }
        catch (error) {
            // Log the error for debugging purposes
            console.log(req.body);
            console.error("Error adding a new student:", error);
            // Send an error response with a 500 Internal Server Error status code
            res.status(500).json({ error: "Internal Server Error" });
        }
    }),
    getAllStudentsService: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const studentRepository = index_1.AppDataSource.getRepository(Student_1.Student);
            const students = yield studentRepository.find();
            res.status(201).json(students);
            return students;
        }
        catch (error) {
            console.log(req.body);
            console.error("Error getting all students:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }),
    editStudentService: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const studentRepository = index_1.AppDataSource.getRepository(Student_1.Student);
            const student = yield studentRepository.findOne({
                where: { id: parseInt(req.params.id) },
            });
            console.log(student);
            if (student) {
                studentRepository.merge(student, req.body);
                const results = yield studentRepository.save(student);
                return res.status(201).json(results);
            }
            return res.status(404).json({ message: "Student not found" });
        }
        catch (error) {
            console.log(req.body);
            console.error("Error editing student:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }),
    deleteStudentService: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const studentRepository = index_1.AppDataSource.getRepository(Student_1.Student);
            const student = yield studentRepository.findOne({
                where: { id: parseInt(req.params.id) },
            });
            console.log(student);
            if (student) {
                yield studentRepository.remove(student);
                return res.status(204).end();
            }
            return res.status(404).json({ message: "Student not found" });
        }
        catch (error) {
            console.log(req.body);
            console.error("Error deleting student:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }),
};
exports.default = StudentService;

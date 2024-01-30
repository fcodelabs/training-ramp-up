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
const studentService_1 = __importDefault(require("../services/studentService"));
const StudentController = {
    addNewStudentController: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            console.log("hello 1");
            //const studentRepository = AppDataSource.getRepository(Student);
            // Create a new student instance with data from the request body
            //console.log("hello 2");
            yield studentService_1.default.addNewStudentService(req, res);
        }
        catch (error) {
            // Log the error for debugging purposes
            console.log(req.body);
            console.error("Error adding a new student:", error);
            // Send an error response with a 500 Internal Server Error status code
            res.status(500).json({ error: "Internal Server Error" });
        }
    }),
    getAllStudentsController: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield studentService_1.default.getAllStudentsService(req, res);
        }
        catch (error) {
            console.log(req.body);
            console.error("Error getting all students:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }),
    editStudentController: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield studentService_1.default.editStudentService(req, res);
        }
        catch (error) {
            console.log(req.body);
            console.error("Error editing student:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }),
    deleteStudentController: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield studentService_1.default.deleteStudentService(req, res);
            console.log("delete controller", res.statusCode);
        }
        catch (error) {
            console.log(req.body);
            console.error("Error deleting student:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }),
};
exports.default = StudentController;

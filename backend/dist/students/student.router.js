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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentRouter = void 0;
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const StudentService = __importStar(require("./student.service"));
exports.studentRouter = express_1.default.Router();
// GET: List of all Students
exports.studentRouter.get("/", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const students = yield StudentService.listStudents();
        return response.status(200).json(students);
    }
    catch (error) {
        return response.status(500).json(error.message);
    }
}));
// GET: A single Student by ID
exports.studentRouter.get("/:id", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
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
}));
// POST: Create a Student
exports.studentRouter.post("/", (0, express_validator_1.body)("name").isString(), (0, express_validator_1.body)("gender").isString(), (0, express_validator_1.body)("address").isString(), (0, express_validator_1.body)("mobileNo").isString(), (0, express_validator_1.body)("dateOfBirth").isString(), (0, express_validator_1.body)("age").isNumeric(), (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(request);
    if (!errors.isEmpty()) {
        return response.status(400).json({ errors: errors.array() });
    }
    try {
        const student = request.body;
        const newStudent = yield StudentService.createStudent(student);
        return response.status(201).json(newStudent);
    }
    catch (error) {
        return response.status(500).json(error.message);
    }
}));
// PUT: Updating an Author
exports.studentRouter.put("/:id", (0, express_validator_1.body)("name").isString(), (0, express_validator_1.body)("gender").isString(), (0, express_validator_1.body)("address").isString(), (0, express_validator_1.body)("mobileNo").isString(), (0, express_validator_1.body)("dateOfBirth").isString(), (0, express_validator_1.body)("age").isNumeric(), (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(request);
    if (!errors.isEmpty()) {
        return response.status(400).json({ errors: errors.array() });
    }
    const id = parseInt(request.params.id, 10);
    try {
        const student = request.body;
        const updateStudent = yield StudentService.updateStudent(student, id);
        return response.status(200).json(updateStudent);
    }
    catch (error) {
        return response.status(500).json(error.message);
    }
}));
// DELETE: Delete an author based on the id
exports.studentRouter.delete("/:id", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(request.params.id, 10);
    try {
        yield StudentService.deleteStudent(id);
        return response.status(204).json("Student has been successfully deleted");
    }
    catch (error) {
        return response.status(500).json(error.message);
    }
}));

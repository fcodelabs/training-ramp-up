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
exports.deleteStudentService = exports.saveStudentService = exports.mergeStudentService = exports.findStudentService = exports.addStudentService = exports.getAllStudentsService = void 0;
const StudentEntity_1 = require("../entities/StudentEntity");
const dataSource_1 = __importDefault(require("../dataSource"));
// get all students
const getAllStudentsService = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const studentRepository = dataSource_1.default.getRepository(StudentEntity_1.Student);
        const students = yield studentRepository.find();
        return students;
    }
    catch (err) {
        console.log(err);
        return { err: 'Student fetching failed' };
    }
});
exports.getAllStudentsService = getAllStudentsService;
// add student
const addStudentService = (student) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const studentRepository = dataSource_1.default.getRepository(StudentEntity_1.Student);
        yield studentRepository.insert(student);
    }
    catch (err) {
        console.log(err);
        return { err: 'Student adding failed into the database' };
    }
});
exports.addStudentService = addStudentService;
// update or patch student
const findStudentService = (studentId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield StudentEntity_1.Student.findOneBy({ id: studentId });
});
exports.findStudentService = findStudentService;
const mergeStudentService = (student, body) => __awaiter(void 0, void 0, void 0, function* () {
    return StudentEntity_1.Student.merge(student, body);
});
exports.mergeStudentService = mergeStudentService;
const saveStudentService = (student) => __awaiter(void 0, void 0, void 0, function* () {
    return yield StudentEntity_1.Student.save(student);
});
exports.saveStudentService = saveStudentService;
// delete student
const deleteStudentService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    function remove(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield StudentEntity_1.Student.delete({ id: id });
        });
    }
    return remove(id);
});
exports.deleteStudentService = deleteStudentService;

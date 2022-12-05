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
exports.deleteStudentService = exports.updateStudentService = exports.getAllStudentsService = exports.addStudentService = void 0;
const students = [];
const addStudentService = (student) => __awaiter(void 0, void 0, void 0, function* () {
    function add(student) {
        return __awaiter(this, void 0, void 0, function* () {
            students.push(student);
            return student;
        });
    }
    return add(student);
});
exports.addStudentService = addStudentService;
const getAllStudentsService = () => __awaiter(void 0, void 0, void 0, function* () {
    function getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return students;
        });
    }
    return getAll();
});
exports.getAllStudentsService = getAllStudentsService;
const updateStudentService = (student) => __awaiter(void 0, void 0, void 0, function* () {
    function update(student) {
        return __awaiter(this, void 0, void 0, function* () {
            const index = students.findIndex((s) => s.id === student.id);
            students[index] = student;
            return student;
        });
    }
    return update(student);
});
exports.updateStudentService = updateStudentService;
const deleteStudentService = (student) => __awaiter(void 0, void 0, void 0, function* () {
    function remove(student) {
        return __awaiter(this, void 0, void 0, function* () {
            const index = students.findIndex((s) => s.id === student.id);
            students.splice(index, 1);
            return students;
        });
    }
    return remove(student);
});
exports.deleteStudentService = deleteStudentService;

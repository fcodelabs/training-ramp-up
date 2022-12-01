"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteStudentService = exports.updateStudentService = exports.addStudentService = exports.getAllStudentsService = void 0;
const students_1 = __importDefault(require("../../utils/students"));
const getAllStudentsService = () => {
    return students_1.default;
};
exports.getAllStudentsService = getAllStudentsService;
const addStudentService = (student) => {
    students_1.default.push(student);
    return students_1.default;
};
exports.addStudentService = addStudentService;
const updateStudentService = (updatestudent) => {
    const temp = students_1.default.find(student => student.personID === updatestudent.personID);
    if (temp != null) {
        const index = students_1.default.indexOf(temp);
        students_1.default[index] = updatestudent;
        return students_1.default;
    }
};
exports.updateStudentService = updateStudentService;
const deleteStudentService = (ID) => {
    const temp = students_1.default.find(student => student.personID === ID);
    if (temp != null) {
        const index = students_1.default.indexOf(temp);
        students_1.default.splice(index, 1);
        return students_1.default;
    }
};
exports.deleteStudentService = deleteStudentService;

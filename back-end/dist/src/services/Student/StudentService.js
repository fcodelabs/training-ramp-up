"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteStudentService = exports.updateStudentService = exports.addStudentService = exports.getAllStudentsService = void 0;
var students_1 = __importDefault(require("../../utils/students"));
var getAllStudentsService = function () {
    return students_1.default;
};
exports.getAllStudentsService = getAllStudentsService;
var addStudentService = function (student) {
    students_1.default.push(student);
    return students_1.default;
};
exports.addStudentService = addStudentService;
var updateStudentService = function (updatestudent) {
    var temp = students_1.default.find(function (student) { return student.personID === updatestudent.personID; });
    if (temp != null) {
        var index = students_1.default.indexOf(temp);
        students_1.default[index] = updatestudent;
        return students_1.default;
    }
};
exports.updateStudentService = updateStudentService;
var deleteStudentService = function (ID) {
    var temp = students_1.default.find(function (student) { return student.personID === ID; });
    if (temp != null) {
        var index = students_1.default.indexOf(temp);
        students_1.default.splice(index, 1);
        return students_1.default;
    }
};
exports.deleteStudentService = deleteStudentService;
//# sourceMappingURL=StudentService.js.map
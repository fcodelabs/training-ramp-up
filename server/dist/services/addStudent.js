"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addStudent = void 0;
//generate new id
const generateId = (data) => data.reduce((acc, current) => Math.max(acc, current.id), 0) + 1;
function addStudent(data, dummy_data) {
    const id = generateId(dummy_data);
    const newStudent = Object.assign({ id }, data);
    dummy_data.push(newStudent);
    return newStudent;
}
exports.addStudent = addStudent;

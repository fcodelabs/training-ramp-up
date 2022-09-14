"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateStudent = void 0;
function updateStudent(id, data, dummy_data) {
    let index = dummy_data.findIndex((student) => student.id === id);
    let updatedStudent = Object.assign({ id }, data);
    dummy_data[index] = updatedStudent;
    return updatedStudent;
}
exports.updateStudent = updateStudent;

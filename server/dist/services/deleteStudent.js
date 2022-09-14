"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteStudent = void 0;
function deleteStudent(id, dummy_data) {
    let index = dummy_data.findIndex((student) => student.id === id);
    let deletedStudent = dummy_data.splice(index, 1);
    return deletedStudent;
}
exports.deleteStudent = deleteStudent;

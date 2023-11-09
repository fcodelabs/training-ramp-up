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
exports.deleteStudent = exports.updateStudent = exports.createStudent = exports.getStudent = exports.listStudents = void 0;
const db_server_1 = require("../utils/db.server");
const listStudents = () => __awaiter(void 0, void 0, void 0, function* () {
    return db_server_1.db.student.findMany({
        select: {
            id: true,
            name: true,
            gender: true,
            address: true,
            mobileNo: true,
            dateOfBirth: true,
            age: true,
        },
    });
});
exports.listStudents = listStudents;
const getStudent = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return db_server_1.db.student.findUnique({
        where: {
            id,
        },
    });
});
exports.getStudent = getStudent;
const createStudent = (student) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, gender, address, mobileNo, dateOfBirth, age } = student;
    return db_server_1.db.student.create({
        data: {
            name,
            gender,
            address,
            mobileNo,
            dateOfBirth,
            age,
        },
        select: {
            id: true,
            name: true,
            gender: true,
            address: true,
            mobileNo: true,
            dateOfBirth: true,
            age: true,
        },
    });
});
exports.createStudent = createStudent;
const updateStudent = (student, id) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, gender, address, mobileNo, dateOfBirth, age } = student;
    return db_server_1.db.student.update({
        where: {
            id,
        },
        data: {
            name,
            gender,
            address,
            mobileNo,
            dateOfBirth,
            age,
        },
        select: {
            id: true,
            name: true,
            gender: true,
            address: true,
            mobileNo: true,
            dateOfBirth: true,
            age: true,
        },
    });
});
exports.updateStudent = updateStudent;
const deleteStudent = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield db_server_1.db.student.delete({
        where: {
            id,
        },
    });
});
exports.deleteStudent = deleteStudent;

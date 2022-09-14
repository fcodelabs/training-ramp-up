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
exports.updateStudent = void 0;
const Student_1 = require("../models/Student");
const db_1 = __importDefault(require("../util/db"));
const calcAge = (dob) => {
    let today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    return age;
};
function updateStudent(id, data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const studentRepository = db_1.default.getRepository(Student_1.Student);
            const studentToUpdate = yield studentRepository.findOneBy({ id });
            if (!studentToUpdate) {
                return { message: "Student not found !" };
            }
            const dob = new Date(data.dob);
            const age = calcAge(dob);
            const updatedStudent = yield studentRepository.save(Object.assign(Object.assign(Object.assign({}, studentToUpdate), data), { age, dob }));
            if (!updatedStudent) {
                return { message: "Failed to update student !" };
            }
            return { message: "Successfully updated the student !", data: updatedStudent };
        }
        catch (error) {
            return { error };
        }
    });
}
exports.updateStudent = updateStudent;

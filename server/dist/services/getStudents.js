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
exports.getStudents = void 0;
const Student_1 = require("../models/Student");
const db_1 = __importDefault(require("../util/db"));
function getStudents() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const studentRepository = db_1.default.getRepository(Student_1.Student);
            const allStudents = yield studentRepository.find();
            return allStudents;
        }
        catch (error) {
            return { error };
        }
    });
}
exports.getStudents = getStudents;

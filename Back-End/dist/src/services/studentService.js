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
exports.deleteStudentService = exports.upsertStudentService = exports.getAllStudentsService = void 0;
const studentEntity_1 = require("../entities/studentEntity");
const dataSource_1 = __importDefault(require("../dataSource"));
const getAllStudentsService = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const studentRepository = dataSource_1.default.getRepository(studentEntity_1.Student);
        const students = yield studentRepository.find();
        return students;
    }
    catch (err) {
        console.log(err);
        return { err: 'Student fetching failed' };
    }
});
exports.getAllStudentsService = getAllStudentsService;
const upsertStudentService = (student) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const studentRepository = dataSource_1.default.getRepository(studentEntity_1.Student);
        const result = yield studentRepository.upsert(student, ['id']);
        return result;
    }
    catch (err) {
        console.log(err);
        return { err: 'Student upserting failed' };
    }
});
exports.upsertStudentService = upsertStudentService;
const deleteStudentService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    function remove(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield studentEntity_1.Student.delete({ id: id });
        });
    }
    return remove(id);
});
exports.deleteStudentService = deleteStudentService;

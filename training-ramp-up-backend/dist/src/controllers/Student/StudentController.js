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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var Student_1 = require("../../models/Student");
var dataSourceConfig_1 = require("../../configs/dataSourceConfig");
var student = express.Router();
var students = [];
student.get('/', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var students_1, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, dataSourceConfig_1.appDataSource.manager.find(Student_1.Student)];
            case 1:
                students_1 = _a.sent();
                res.send(students_1);
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                res.send('Error' + err_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
student.post('/', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var student_1, students_2, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                student_1 = new Student_1.Student();
                student_1.name = req.body.name;
                student_1.address = req.body.address;
                student_1.gender = req.body.gender;
                student_1.dateOfBirth = req.body.dateOfBirth;
                student_1.age = req.body.age;
                student_1.mobileNo = req.body.mobileNo;
                return [4 /*yield*/, dataSourceConfig_1.appDataSource.manager.save(student_1)];
            case 1:
                students_2 = _a.sent();
                res.send(students_2);
                return [3 /*break*/, 3];
            case 2:
                err_2 = _a.sent();
                res.send('Error' + err_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
student.put('/', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var student_2, students_3, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                student_2 = new Student_1.Student();
                student_2.id = req.body.id;
                student_2.name = req.body.name;
                student_2.address = req.body.address;
                student_2.gender = req.body.gender;
                student_2.dateOfBirth = req.body.dateOfBirth;
                student_2.age = req.body.age;
                student_2.mobileNo = req.body.mobileNo;
                return [4 /*yield*/, dataSourceConfig_1.appDataSource.manager.save(student_2)];
            case 1:
                students_3 = _a.sent();
                res.send(students_3);
                return [3 /*break*/, 3];
            case 2:
                err_3 = _a.sent();
                res.send('Error' + err_3);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
student.delete('/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var students_4, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, dataSourceConfig_1.appDataSource.manager.delete(Student_1.Student, req.params.id)];
            case 1:
                students_4 = _a.sent();
                res.send(students_4);
                return [3 /*break*/, 3];
            case 2:
                err_4 = _a.sent();
                res.send('Error' + err_4);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
exports.default = student;
//# sourceMappingURL=StudentController.js.map
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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
exports.deleteStudent = exports.updateStudent = exports.addStudent = exports.getAllStudents = void 0;
var __1 = require("../../..");
var StudentService_1 = require("../../services/Student/StudentService");
var validate = function (person) {
    var name = /^([A-z\s.]{3,20})$/;
    var address = /^([A-z0-9/,\s]{5,})$/;
    var mobileNo = /^([0][0-9]{9})$/;
    var age = Math.round((new Date().getTime() - new Date(person.dob).getTime()) / (1000 * 60 * 60 * 24 * 365));
    var validateAge = age >= 18;
    if (person.name !== undefined && !name.test(person.name)) {
        return false;
    }
    if (person.gender !== undefined && person.gender === '') {
        return false;
    }
    if (person.address !== undefined && !address.test(person.address)) {
        return false;
    }
    if (person.mobileNo !== undefined && !mobileNo.test(person.mobileNo)) {
        return false;
    }
    if (person.dob !== undefined && !validateAge) {
        return false;
    }
    return true;
};
var getAllStudents = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var students, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, (0, StudentService_1.getAllStudentsService)()];
            case 1:
                students = _a.sent();
                res.status(200).send(students);
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                res.send("Error: ".concat(err_1));
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getAllStudents = getAllStudents;
var addStudent = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var result, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                if (!validate(req.body)) return [3 /*break*/, 2];
                return [4 /*yield*/, (0, StudentService_1.addStudentService)(req.body)];
            case 1:
                result = _a.sent();
                res.status(201).send(result);
                __1.io.emit('notification', 'Student has been added');
                return [3 /*break*/, 3];
            case 2:
                res.send('Can not add student. Enter Valid Data');
                _a.label = 3;
            case 3: return [3 /*break*/, 5];
            case 4:
                err_2 = _a.sent();
                res.send("Error: ".concat(err_2));
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.addStudent = addStudent;
var updateStudent = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var result, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                if (!validate(req.body)) return [3 /*break*/, 2];
                return [4 /*yield*/, (0, StudentService_1.updateStudentService)(req.body)];
            case 1:
                result = _a.sent();
                res.status(200).send(result);
                __1.io.emit('notification', 'Student has been updated');
                return [3 /*break*/, 3];
            case 2:
                res.send('Can not update student. Enter Valid Data');
                _a.label = 3;
            case 3: return [3 /*break*/, 5];
            case 4:
                err_3 = _a.sent();
                res.send("Error: ".concat(err_3));
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.updateStudent = updateStudent;
var deleteStudent = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var studentId, result, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                studentId = parseInt(req.params.Id);
                return [4 /*yield*/, (0, StudentService_1.deleteStudentService)(studentId)];
            case 1:
                result = _a.sent();
                res.status(200).send(result);
                __1.io.emit('notification', 'Student has been deleted');
                return [3 /*break*/, 3];
            case 2:
                err_4 = _a.sent();
                res.send("Error: ".concat(err_4));
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.deleteStudent = deleteStudent;
//# sourceMappingURL=StudentController.js.map
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentRouter = void 0;
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const StudentController = __importStar(require("../controllers/student.controllers"));
exports.studentRouter = express_1.default.Router();
exports.studentRouter.get("/", StudentController.getStudents);
exports.studentRouter.get("/:id", StudentController.getStudent);
exports.studentRouter.post("/", (0, express_validator_1.body)("name").isString(), (0, express_validator_1.body)("gender").isString(), (0, express_validator_1.body)("address").isString(), (0, express_validator_1.body)("mobileNo").isString(), (0, express_validator_1.body)("dateOfBirth").isString(), (0, express_validator_1.body)("age").isNumeric(), StudentController.createStudent);
exports.studentRouter.put("/:id", (0, express_validator_1.body)("name").isString(), (0, express_validator_1.body)("gender").isString(), (0, express_validator_1.body)("address").isString(), (0, express_validator_1.body)("mobileNo").isString(), (0, express_validator_1.body)("dateOfBirth").isString(), (0, express_validator_1.body)("age").isNumeric(), StudentController.updateStudent);
exports.studentRouter.delete("/:id", StudentController.deleteStudent);

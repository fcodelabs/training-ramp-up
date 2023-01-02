"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const StudentController_1 = require("../controllers/StudentController");
const StudentValidation_1 = require("../utils/Validation/StudentValidation");
const Authentication_1 = __importDefault(require("../utils/Authentication"));
const RoleCheck_1 = __importDefault(require("../utils/RoleCheck"));
const studentRouter = express_1.default.Router();
studentRouter.post('/', (0, StudentValidation_1.studentAddValidationRules)(), StudentValidation_1.studentValidation, StudentController_1.addStudent);
// pass the role of the user who can access this route
studentRouter.get('/', Authentication_1.default, RoleCheck_1.default, StudentController_1.getAllStudents);
studentRouter.patch('/:id', (0, StudentValidation_1.studentPatchValidationRules)(), StudentValidation_1.studentValidation, StudentController_1.patchStudent);
studentRouter.delete('/:id', StudentController_1.deleteStudent);
exports.default = studentRouter;

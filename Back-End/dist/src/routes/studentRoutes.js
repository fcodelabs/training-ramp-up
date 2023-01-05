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
studentRouter.post('/', (0, StudentValidation_1.studentAddValidationRules)(), StudentValidation_1.studentValidation, Authentication_1.default, (0, RoleCheck_1.default)(['admin']), StudentController_1.addStudent);
studentRouter.get('/', Authentication_1.default, (0, RoleCheck_1.default)(['admin', 'user']), StudentController_1.getAllStudents);
studentRouter.patch('/:id', (0, StudentValidation_1.studentPatchValidationRules)(), Authentication_1.default, (0, RoleCheck_1.default)(['admin']), StudentValidation_1.studentValidation, StudentController_1.patchStudent);
studentRouter.delete('/:id', Authentication_1.default, (0, RoleCheck_1.default)(['admin', 'user']), StudentController_1.deleteStudent);
exports.default = studentRouter;

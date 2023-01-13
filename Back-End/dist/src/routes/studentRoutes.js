"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const studentController_1 = require("../controllers/studentController");
const studentValidation_1 = require("../utils/Validation/studentValidation");
const authentication_1 = __importDefault(require("../utils/authentication"));
const roleCheck_1 = __importDefault(require("../utils/roleCheck"));
const studentRouter = express_1.default.Router();
studentRouter.post('/', (0, studentValidation_1.studentAddValidationRules)(), studentValidation_1.studentValidation, authentication_1.default, (0, roleCheck_1.default)(['admin']), studentController_1.addStudent);
studentRouter.get('/', authentication_1.default, (0, roleCheck_1.default)(['admin', 'user']), studentController_1.getAllStudents);
studentRouter.patch('/', authentication_1.default, (0, roleCheck_1.default)(['admin']), studentController_1.patchStudent);
studentRouter.delete('/:id', authentication_1.default, (0, roleCheck_1.default)(['admin']), studentController_1.deleteStudent);
exports.default = studentRouter;

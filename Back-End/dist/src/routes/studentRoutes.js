"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const StudentController_1 = require("../controllers/StudentController");
const StudentValidation_1 = require("../utils/Validation/StudentValidation");
const router = express_1.default.Router();
router.post('/', (0, StudentValidation_1.studentAddOrUpdateValidationRules)(), StudentValidation_1.studentValidation, StudentController_1.addStudent);
router.get('/', StudentController_1.getAllStudents);
router.put('/:id', (0, StudentValidation_1.studentAddOrUpdateValidationRules)(), StudentValidation_1.studentValidation, StudentController_1.updateStudent);
router.patch('/:id', (0, StudentValidation_1.studentPatchValidationRules)(), StudentValidation_1.studentValidation, StudentController_1.patchStudent);
router.delete('/:id', StudentController_1.deleteStudent);
exports.default = router;

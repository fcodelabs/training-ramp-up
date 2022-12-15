"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var StudentController_1 = require("../controllers/StudentController");
var route = express.Router();
route.get('/', StudentController_1.requestGetAllStudents);
route.post('/', StudentController_1.requestAddStudent);
route.patch('/', StudentController_1.requestUpdateStudent);
route.delete('/:id', StudentController_1.requestDeleteStudent);
exports.default = route;
//# sourceMappingURL=StudentRoutes.js.map
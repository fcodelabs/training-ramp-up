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
const studentController = __importStar(require("../controllers/student.controller"));
// import passport from 'passport';
//guards
const user_auth_guard_1 = require("../middleware/user.auth.guard");
const admin_auth_guard_1 = require("../middleware/admin.auth.guard");
exports.studentRouter = express_1.default.Router();
//Get all student data
exports.studentRouter.get("/", user_auth_guard_1.UserAuthGuard, studentController.getAll);
//Add Student
exports.studentRouter.post("/", user_auth_guard_1.UserAuthGuard, admin_auth_guard_1.AdminAuthGuard, studentController.addOne);
//Update/Edit Student
exports.studentRouter.put("/:id", user_auth_guard_1.UserAuthGuard, admin_auth_guard_1.AdminAuthGuard, studentController.updateOne);
//Delete Student
exports.studentRouter.delete("/:id", user_auth_guard_1.UserAuthGuard, admin_auth_guard_1.AdminAuthGuard, studentController.deleteOne);

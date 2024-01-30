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
const express_1 = require("express");
const studentController_1 = __importDefault(require("../controllers/studentController"));
// const router = express.Router();
// // Create a new student
// router.post("/add", StudentController.addNewStudentController);
// router.get("/allStudents", StudentController.getAllStudentsController);
// router.put("/edit/:id", StudentController.editStudentController);
// router.delete("/delete/:id", StudentController.deleteStudentController);
// export default router;
function socketRouter(io) {
    const router = (0, express_1.Router)();
    router.post("/add", (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            yield studentController_1.default.addNewStudentController(req, res).then(() => {
                io.emit("new-student", res.statusCode);
            });
        }
        catch (error) {
            console.error(error);
        }
    }));
    router.get("/allStudents", (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            yield studentController_1.default.getAllStudentsController(req, res).then(() => {
                io.emit("get-all-students", res.statusCode);
            });
        }
        catch (error) {
            console.error(error);
        }
    }));
    router.put("/edit/:id", (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            yield studentController_1.default.editStudentController(req, res).then(() => {
                io.emit("edit-student", res.statusCode);
            });
        }
        catch (error) {
            console.error(error);
        }
    }));
    router.delete("/delete/:id", (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            yield studentController_1.default.deleteStudentController(req, res).then(() => {
                io.emit("delete-student", res.statusCode);
            });
        }
        catch (error) {
            console.error(error);
        }
    }));
    return router;
}
exports.default = socketRouter;

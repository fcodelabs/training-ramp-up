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
const express_1 = __importDefault(require("express"));
const services_1 = require("../services");
const router = express_1.default.Router();
//Get all student data
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, services_1.getStudents)();
    if (result.error) {
        res.status(400).send({ message: result.error });
        return;
    }
    res.status(200).send({ message: "Student data recieved!", students: result });
}));
//Add Student
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const result = yield (0, services_1.addStudent)(data);
    if (result.error) {
        res.status(400).send({ message: result.error });
        return;
    }
    res.status(200).send({ message: result.message, student: result.data });
}));
//Update/Edit Student
router.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const data = req.body;
    const result = yield (0, services_1.updateStudent)(id, data);
    if (result.error) {
        res.status(400).send({ message: result.error });
        return;
    }
    res.status(200).send({ message: result.message, updatedStudent: result.data });
}));
//Delete Student
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let id = parseInt(req.params.id);
    const result = yield (0, services_1.deleteStudent)(id);
    if (result.error) {
        res.status(400).send({ message: result.error });
        return;
    }
    res.status(200).send({ message: result.message });
}));
exports.default = router;

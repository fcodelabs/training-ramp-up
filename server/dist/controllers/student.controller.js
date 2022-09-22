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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOne = exports.updateOne = exports.addOne = exports.getAll = void 0;
const services_1 = require("../services");
function getAll(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield (0, services_1.getStudents)();
        if (result.error) {
            res.status(400).json({ message: "Failed to retrieve student data!", error: result.error });
            return;
        }
        res.status(200).json({ message: "Successfully retrieved data!", students: result.students });
    });
}
exports.getAll = getAll;
function addOne(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield (0, services_1.addStudent)(req.body);
        if (result.error) {
            res.status(400).json({ message: "Failed to add student!", error: result.error });
            return;
        }
        res.status(200).json({ message: "Student has been added successfully!", student: result.data });
    });
}
exports.addOne = addOne;
function updateOne(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = parseInt(req.params.id);
        const data = req.body;
        const result = yield (0, services_1.updateStudent)(id, data);
        if (result.error) {
            res.status(400).json({ message: "Error occured updating the student!", error: result.error });
            return;
        }
        res.status(200).json({ message: "Successfully updated the student", updatedStudent: result.data });
    });
}
exports.updateOne = updateOne;
function deleteOne(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = parseInt(req.params.id);
        console.log(id);
        const result = yield (0, services_1.deleteStudent)(id);
        if (result.error) {
            res.status(400).json({ message: "Error occured while deleting the student!", error: result.error });
            return;
        }
        res.status(200).json({ message: "Successfully deleted the student", id });
    });
}
exports.deleteOne = deleteOne;

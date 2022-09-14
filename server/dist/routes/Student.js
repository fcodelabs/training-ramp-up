"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const services_1 = require("../services");
const router = express_1.default.Router();
//dummy data for manipulation
const temp_data_1 = require("../util/temp-data");
router.get("/", (req, res) => {
    // const students = getStudents();
    res.send({ message: "All Student data recieved!", data: temp_data_1.dummy_data });
});
router.post("/", (req, res) => {
    const data = req.body;
    const newStudent = (0, services_1.addStudent)(data, temp_data_1.dummy_data);
    res.send({ message: "Student has been created!", data: newStudent });
});
router.put("/:id", (req, res) => {
    let id = parseInt(req.params.id);
    let data = req.body;
    const updatedStudent = (0, services_1.updateStudent)(id, data, temp_data_1.dummy_data);
    res.send({ message: "Student has been updated!", data: updatedStudent });
});
router.delete("/:id", (req, res) => {
    let id = parseInt(req.params.id);
    const deletedStudent = (0, services_1.deleteStudent)(id, temp_data_1.dummy_data);
    res.send({ message: "Student has been deleted!", data: deletedStudent });
});
exports.default = router;

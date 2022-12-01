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
const student = express_1.default.Router();
const students = [];
student.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.send(students);
        //const users = await User.find()
        //res.json(users)
    }
    catch (err) {
        res.send("Error" + err);
    }
}));
student.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        students.push(req.body);
        res.send(students);
        //const users = await User.find()
        //res.json(users)
    }
    catch (err) {
        res.send("Error" + err);
    }
}));
student.put('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const temp = students.find(student => student.id == req.body.id);
        if (temp != null) {
            const index = students.indexOf(temp);
            students[index] = req.body;
            res.send(students);
        }
    }
    catch (err) {
        res.send("Error" + err);
    }
}));
student.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const temp = students.find(student => req.params.id == student.id.toString());
        if (temp) {
            const index = students.indexOf(temp);
            students.splice(index, 1);
            res.send(students);
        }
    }
    catch (err) {
        res.send("Error" + err);
    }
}));
exports.default = student;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentRepository = void 0;
const typeorm_1 = require("typeorm");
const Student_1 = require("../models/Student");
class StudentRepository {
    constructor() {
        this.repository = (0, typeorm_1.getRepository)(Student_1.Student);
    }
    async getAll() {
        return this.repository.find({});
    }
    async create(studentData) {
        const { id, name, gender, address, mobileno, dob, age } = studentData;
        const existingStudent = await this.repository.findOne({ where: { id: id } });
        if (existingStudent) {
            throw new Error('Student with this ID already exists. Please choose a different ID.');
        }
        const newStudent = this.repository.create({
            id,
            name,
            gender,
            address,
            mobileno,
            dob,
            age
        });
        await this.repository.save(newStudent);
        return newStudent;
    }
    async update(id, studentData) {
        const { name, gender, address, mobileno, dob, age } = studentData;
        const existingStudent = await this.repository.findOne({
            where: { id: id }
        });
        if (!existingStudent) {
            throw new Error('Student not found');
        }
        existingStudent.name = name;
        existingStudent.gender = gender;
        existingStudent.address = address;
        existingStudent.mobileno = mobileno;
        existingStudent.dob = dob;
        existingStudent.age = age;
        await this.repository.save(existingStudent);
        return existingStudent;
    }
    async delete(id) {
        const existingStudent = await this.repository.findOne({
            where: { id: id }
        });
        if (!existingStudent) {
            throw new Error('Student not found');
        }
        await this.repository.remove(existingStudent);
        return 'Student deleted successfully';
    }
}
exports.StudentRepository = StudentRepository;
//# sourceMappingURL=studentRepo.js.map
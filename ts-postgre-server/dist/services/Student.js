"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteStudentService = exports.updateStudentService = exports.createStudentService = exports.getStudentsService = void 0;
const typeorm_1 = require("typeorm");
const Student_1 = require("../models/Student");
const getStudentsService = async () => {
    const studentRepo = (0, typeorm_1.getRepository)(Student_1.Student);
    return studentRepo.find({});
};
exports.getStudentsService = getStudentsService;
const createStudentService = async (studentData) => {
    const { id, name, gender, address, mobile, dob, age } = studentData;
    const existingStudent = await Student_1.Student.findOne({ where: { id: id } });
    if (existingStudent) {
        throw new Error('Student with this ID already exists. Please choose a different ID.');
    }
    const newStudent = Student_1.Student.create({
        id,
        name,
        gender,
        address,
        mobile,
        dob,
        age
    });
    await newStudent.save();
    return newStudent;
};
exports.createStudentService = createStudentService;
const updateStudentService = async (id, studentData) => {
    const { name, gender, address, mobile, dob, age } = studentData;
    const studentRepo = (0, typeorm_1.getRepository)(Student_1.Student);
    const existingStudent = await studentRepo.findOne({
        where: { id: Number(id) }
    });
    if (!existingStudent) {
        throw new Error('Student not found');
    }
    existingStudent.name = name;
    existingStudent.gender = gender;
    existingStudent.address = address;
    existingStudent.mobile = mobile;
    existingStudent.dob = dob;
    existingStudent.age = age;
    await studentRepo.save(existingStudent);
    return existingStudent;
};
exports.updateStudentService = updateStudentService;
const deleteStudentService = async (id) => {
    const studentRepo = (0, typeorm_1.getRepository)(Student_1.Student);
    const existingStudent = await studentRepo.findOne({
        where: { id: Number(id) }
    });
    if (!existingStudent) {
        throw new Error('Student not found');
    }
    await studentRepo.remove(existingStudent);
    return 'Student deleted successfully';
};
exports.deleteStudentService = deleteStudentService;
//# sourceMappingURL=Student.js.map
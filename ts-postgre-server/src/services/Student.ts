import 'reflect-metadata';
import { getRepository } from 'typeorm';
import { Student } from '../models/Student';


export const getStudentsService = async () => {
    const studentRepo = getRepository(Student);
    return studentRepo.find({});
};

export const createStudentService = async (studentData: any) => {
    const { id, name, gender, address, mobile, dob, age } = studentData;

    const existingStudent = await Student.findOne({ where: { id: id } });

    if (existingStudent) {
        throw new Error('Student with this ID already exists. Please choose a different ID.');
    }

    const newStudent = Student.create({
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

export const updateStudentService = async (id: string, studentData: any) => {
    const { name, gender, address, mobile, dob, age } = studentData;

    const studentRepo = getRepository(Student);

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

export const deleteStudentService = async (id: string) => {
    const studentRepo = getRepository(Student);

    const existingStudent = await studentRepo.findOne({
        where: { id: Number(id) }
    });

    if (!existingStudent) {
        throw new Error('Student not found');
    }

    await studentRepo.remove(existingStudent);

    return 'Student deleted successfully';
};


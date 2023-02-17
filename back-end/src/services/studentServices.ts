import { Request, Response } from "express";
import { Student } from "../models/StudentModel";
import { AppDataSource } from "../configs/dbConfig";
const generateOutput = require("../utils/outputFactory");

export async function getAllStudents() {
  const students = await AppDataSource.getRepository(Student).find();
  return students;
}

export async function addStudentDetails(req) {
  const newStudent = {
    name: req.body.name,
    gender: req.body.gender,
    address: req.body.address,
    mobile: req.body.mobile,
    dob: req.body.dob,
    age: req.body.age,
  };
  const student = AppDataSource.getRepository(Student).create(newStudent);
  const savedStudent = await AppDataSource.getRepository(Student).save(student);
  global.io.emit("notify", { message: `New student added` });
  return savedStudent;
}

export async function updateStudentDetails(req) {
  const id = parseInt(req.params.id, 10);
  const student = await AppDataSource.getRepository(Student).findOne({
    where: { id: parseInt(req.params.id, 10) },
  });
  if (student) {
    AppDataSource.getRepository(Student).merge(student, req.body);
    const updatedStudent = await AppDataSource.getRepository(Student).save(
      student
    );
    global.io.emit("notify", {
      message: `Details of ${updatedStudent.name} has updated`,
    });
    return updatedStudent;
  }
}

export async function deleteAStudent(id) {
  const student = await AppDataSource.getRepository(Student).delete(id);
  global.io.emit("notify", { message: `A student deleted` });
  return student;
}

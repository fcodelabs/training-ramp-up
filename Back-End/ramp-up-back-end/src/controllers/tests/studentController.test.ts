import { Request, Response } from "express";
import { DeleteResult } from "typeorm";
import { Student } from "../../entities/studentEntity";
import * as studentServices from "../../services/studentService";
import {
  addStudent,
  deleteStudent,
  getAllStudents,
  updateStudent,
} from "../studentController";
import { GetStudentType } from "./studentControllerTypes";

const mockResponse = () => {
  const res = {} as Response;
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe("Student Controller", () => {
  describe("Get All Student", () => {
    const allStudents = {
      students: [
        {
          id: 1,
          name: "newName1",
          gender: "Male",
          address: "newAddress1",
          mobile: 112463256,
          birthday: "1999-10-10",
          age: 23,
        },
      ],
    } as GetStudentType;

    const req = {} as Request;

    const res = mockResponse();

    test("Get All Student Success", async () => {
      const spyGetStudents = jest
        .spyOn(studentServices, "getAllStudentService")
        .mockResolvedValue(allStudents);
      await getAllStudents(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(allStudents);
      spyGetStudents.mockRestore();
    });

    test("Get All Student Fail", async () => {
      const spyGetStudents = jest
        .spyOn(studentServices, "getAllStudentService")
        .mockRejectedValue(null);
      await getAllStudents(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      spyGetStudents.mockRestore();
    });
  });

  describe("Delete Student", () => {
    const deleteOne = {
      raw: [],
      affected: 1,
    } as DeleteResult;

    const req = {
      params: {
        studentId: "1",
      },
    } as any;

    const res = mockResponse();

    test("Delete Student Success", async () => {
      const spyDeleteStudent = jest
        .spyOn(studentServices, "deleteStudentService")
        .mockResolvedValue(deleteOne);
      await deleteStudent(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      spyDeleteStudent.mockRestore();
    });

    test("Delete Student Fail", async () => {
      const spyDeleteStudent = jest
        .spyOn(studentServices, "deleteStudentService")
        .mockRejectedValue(null);
      await deleteStudent(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      spyDeleteStudent.mockRestore();
    });
  });

  describe("Add New Student", () => {
    const newStudent = {
      id: 1,
      name: "newName",
      gender: "Male",
      address: "newAddress",
      mobile: 112463268,
      birthday: "1997-11-15",
      age: 25,
    } as Student;

    const req = {
      body: {
        name: "newName",
        gender: "Male",
        address: "newAddress",
        mobile: "0112463268",
        birthday: "1997-11-15",
        age: 25,
      },
    } as Request;

    const res = mockResponse();

    test("Add New Student Success", async () => {
      const spyAddStudent = jest
        .spyOn(studentServices, "createStudentService")
        .mockResolvedValue(newStudent);
      await addStudent(req, res);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(newStudent);
      spyAddStudent.mockRestore();
    });

    test("Add New Student Fail", async () => {
      const spyAddStudent = jest
        .spyOn(studentServices, "createStudentService")
        .mockRejectedValue(null);
      await addStudent(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      spyAddStudent.mockRestore();
    });
  });

  describe("Update Student", () => {
    const findStudent = {
      id: 1,
      name: "newName1",
      gender: "Male",
      address: "newAddress1",
      mobile: 112463256,
      birthday: "1999-10-10",
      age: 23,
    } as Student;

    const changesStudent = {
      name: "newName1",
      gender: "Female",
      address: "newAddress1",
      mobile: 112463256,
      birthday: "1999-10-10",
      age: 23,
    } as Student;

    const req = {
      params: {
        studentId: "1",
      },
      body: {
        id: 1,
        name: "newName1",
        gender: "Female",
        address: "newAddress1",
        mobile: 112463256,
        birthday: "1999-10-10",
        age: 23,
      },
    } as any;

    const res = mockResponse();

    test("Update Student Success", async () => {
      const spyfindStudent = jest
        .spyOn(studentServices, "findStudentService")
        .mockResolvedValue(findStudent);
      const spyMergeStudent = jest
        .spyOn(studentServices, "mergeStudentService")
        .mockResolvedValue(changesStudent);
      const spySaveStudent = jest
        .spyOn(studentServices, "saveStudentService")
        .mockResolvedValue(changesStudent);
      await updateStudent(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(changesStudent);
      spyfindStudent.mockRestore();
      spyMergeStudent.mockRestore();
      spySaveStudent.mockRestore();
    });

    test("Update Student Fail", async () => {
      const spyfindStudent = jest
        .spyOn(studentServices, "findStudentService")
        .mockRejectedValue(null);
      const spyMergeStudent = jest
        .spyOn(studentServices, "mergeStudentService")
        .mockRejectedValue(null);
      const spySaveStudent = jest
        .spyOn(studentServices, "saveStudentService")
        .mockRejectedValue(null);
      await updateStudent(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      spyfindStudent.mockRestore();
      spyMergeStudent.mockRestore();
      spySaveStudent.mockRestore();
    });
  });
});

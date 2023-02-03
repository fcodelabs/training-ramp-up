import {
  deleteStudent,
  getAllStudents,
  updateStudent,
} from "./../src/controllers/studentController";
import { Request, Response } from "express";
import { createStudent } from "../src/controllers/studentController";
import { Student } from "../src/models/Student";
import * as StudentServices from "../src/services/studentServices";

describe("Student Constroller test", () => {
  const response = () => {
    const res = {} as Response;
    res.status = jest.fn().mockReturnThis();
    res.send = jest.fn().mockReturnThis();
    return res;
  };
  describe("Create student controller test", () => {
    const user = {
      PersonName: "test",
      PersonSurname: "test",
      PersonPassword: "test",
      PersonRole: "test",
      PersonPhone: "test",
      PersonAddress: "test",
    } as unknown as Student;
    const request_add = {
      body: {
        data: user,
      },
    } as unknown as Request;
    const request_add_fail = {
      body: {
        data: user,
      },
    } as unknown as Request;
    const res_add = response();

    it("test create student", async () => {
      const spyAddStudent = jest
        .spyOn(StudentServices, "createStudentService")
        .mockResolvedValue(user);
      await createStudent(request_add, res_add);
      expect(spyAddStudent).toBeCalledWith(user);
      spyAddStudent.mockRestore();
    });
    it("test create student fail", async () => {
      const spyAddStudent = jest
        .spyOn(StudentServices, "createStudentService")
        .mockResolvedValue(user);
      await createStudent(request_add_fail, res_add);
      expect(spyAddStudent).toBeCalledWith(user);
      spyAddStudent.mockRestore();
    });
  });
  describe("Update student controller test", () => {
    const user = {
      PersonName: "test",
      PersonSurname: "test",
      PersonPassword: "test",
      PersonRole: "test",
      PersonPhone: "test",
      PersonAddress: "test",
    } as unknown as Student;
    const request_add = {
      body: {
        data: user,
      },
    } as unknown as Request;
    const request_add_fail = {
      body: {
        data: user,
      },
    } as unknown as Request;
    const res_add = response();

    it("test update student", async () => {
      const spyUpdateStudent = jest
        .spyOn(StudentServices, "createStudentService")
        .mockResolvedValue(user);
      await updateStudent(request_add, res_add);
      expect(spyUpdateStudent).toBeCalledWith(user);
      spyUpdateStudent.mockRestore();
    });
    it("test update student fail", async () => {
      const spyAddStudent = jest
        .spyOn(StudentServices, "createStudentService")
        .mockResolvedValue(user);
      await updateStudent(request_add_fail, res_add);
      expect(spyAddStudent).toBeCalledWith(user);
      spyAddStudent.mockRestore();
    });
  });
  // describe("delete student controller test", () => {
  //   const user = {
  //     PersonID: "1",
  //     PersonSurname: "test",
  //     PersonPassword: "test",
  //     PersonRole: "test",
  //     PersonPhone: "test",
  //     PersonAddress: "test",
  //   } as unknown as Student;
  //   const id = 1;
  //   const request_add = {
  //     params: {
  //       id: "1",
  //     },
  //   } as unknown as Request;
  //   const request_add_fail = {
  //     params: {
  //       id: "1",
  //     },
  //   } as unknown as Request;
  //   const res_add = response();

  //   it("test delete student fail", async () => {
  //     const spyAddStudent = jest
  //       .spyOn(StudentServices, "deleteStudentService")
  //       .mockResolvedValue(user);
  //     await deleteStudent(request_add_fail, res_add);
  //     expect(spyAddStudent).toBeCalledWith(id);
  //     spyAddStudent.mockRestore();
  //   });
  //   it("test delete student fail", async () => {
  //     const spyAddStudent = jest
  //       .spyOn(StudentServices, "deleteStudentService")
  //       .mockResolvedValue(user);
  //     await deleteStudent(request_add_fail, res_add);
  //     expect(spyAddStudent).toBeCalledWith(id);
  //     spyAddStudent.mockRestore();
  //   });
  // });
  // describe("get student controller test", () => {
  //   const users = {
  //     PersonName: "test",
  //     PersonSurname: "test",
  //     PersonPassword: "test",
  //     PersonRole: "test",
  //     PersonPhone: "test",
  //     PersonAddress: "test",
  //   } as unknown as Student[];
  //   const request_add = {} as unknown as Request;
  //   const res_add = response();

  //   it("test get student", async () => {
  //     const spyAddStudent = jest
  //       .spyOn(StudentServices, "getAllStudentsService")
  //       .mockResolvedValue(users);
  //     await getAllStudents(request_add, res_add);
  //     expect(spyAddStudent).toBeCalledWith();
  //     spyAddStudent.mockRestore();
  //   });
  //   it("test get student fail", async () => {
  //     const spyGetStudent = jest
  //       .spyOn(StudentServices, "getAllStudentsService")
  //       .mockResolvedValue(users);
  //     await getAllStudents(request_add, res_add);
  //     expect(spyGetStudent).toBeCalledWith();
  //     spyGetStudent.mockRestore();
  //   });
  // });
});

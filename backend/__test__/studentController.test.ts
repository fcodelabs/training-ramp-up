import { Request, Response } from "express";
import { createStudent } from "../src/controllers/studentController";
import { Student } from "../src/models/Student";
import * as StudentServices from "../src/services/studentServices";

describe("Student Services test", () => {
  const response = () => {
    const res = {} as Response;
    res.status = jest.fn().mockReturnThis();
    res.send = jest.fn().mockReturnThis();
    return res;
  };
  describe(" Student Services test", () => {
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
    }as unknown as Request;
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
});

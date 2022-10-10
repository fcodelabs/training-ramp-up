import * as studentService from "../students";
import { AppDataSource } from "../../data-source";
import { Student } from "../../entity/Student";

describe("student tests", () => {
  const student = {
    id: 1,
    name: "Anushka",
    gender: "Male",
    address: "Rahula Road, Matara",
    number: parseInt("0711234567", 10),
    birthday: "02/07/2000",
    age: "22 years 3 months 6 days",
  };
  describe("getStudents tests", () => {
    const studentDetails = [student];
    test("GetStudents successful", async () => {
      AppDataSource.manager.find = jest.fn().mockResolvedValue(studentDetails);
      await expect(studentService.getStudents()).resolves.toStrictEqual(
        studentDetails
      );
    });
    test("GetStudents fail", async () => {
      AppDataSource.manager.find = jest.fn().mockRejectedValue(null);
      await expect(studentService.getStudents()).rejects.toStrictEqual(null);
    });
    describe("addStudent tests", () => {
      const newStudent = new Student();
      newStudent.name = "TEST";
      newStudent.gender = "Male";
      newStudent.address = "";
      newStudent.number = 1;
      newStudent.birthday = "";
      newStudent.age = "";
      test("Addstudent successful", async () => {
        AppDataSource.manager.save = jest.fn().mockImplementation((x) => x);
        await expect(
          studentService.addStudent(newStudent)
        ).resolves.toStrictEqual(newStudent);
      });
      test("Addstudent fail", async () => {
        AppDataSource.manager.save = jest
          .fn()
          .mockRejectedValue(Error("Error saving student"));
        await expect(
          studentService.addStudent(newStudent)
        ).rejects.toBeInstanceOf(Error);
      });
    });
    describe("updateStudent tests", () => {
      const newStudent = new Student();
      newStudent.name = "TEST";
      newStudent.gender = "Female";
      newStudent.address = "";
      newStudent.number = 1;
      newStudent.birthday = "";
      newStudent.age = "";
      test("UpdateStudent successful", async () => {
        AppDataSource.manager.update = jest
          .fn()
          .mockImplementation((entity, id, student) => student);
        await expect(
          studentService.updateStudent("1", newStudent)
        ).resolves.toStrictEqual(newStudent);
      });
      test("UpdateStudent fail", async () => {
        AppDataSource.manager.update = jest
          .fn()
          .mockRejectedValue(Error("Error updating student"));
        await expect(
          studentService.updateStudent("1", newStudent)
        ).rejects.toBeInstanceOf(Error);
      });
    });
    describe("deleteStudent tests", () => {
      test("DeleteStudent successful", async () => {
        AppDataSource.manager.delete = jest.fn().mockResolvedValue(student);
        await expect(studentService.deleteStudent("1")).resolves.toStrictEqual(
          student
        );
      });
      test("DeleteStudent fail", async () => {
        AppDataSource.manager.delete = jest
          .fn()
          .mockRejectedValue(Error("Error deleting student"));
        await expect(studentService.deleteStudent("1")).rejects.toBeInstanceOf(
          Error
        );
      });
    });
  });
});

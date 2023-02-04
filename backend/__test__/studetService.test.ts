import { AppDataSource } from "../src/configs/DataSourceConfig";
import * as studentService from "../src/services/studentServices";
import { Student } from "../src/models/Student";
import { User } from "../src/models/User";

describe("Student Service test", () => {
  const student = {
    PersonID: 1,
    PersonName: "test",
    PersonGender: "Male",
    PersonAddress: "test",
    PersonMobileNo: "test",
    DateOfBirth: new Date(),
  } as Student;
  const createStudent = {
    PersonID: 1,
    PersonName: "test",
    PersonGender: "Male",
    PersonAddress: "test",
    PersonMobileNo: "test",
    DateOfBirth: new Date(),
  } as Student;
  describe("Create student service test", () => {
    it("test create student", async () => {
      const spyAppDataSource = jest.spyOn(
        AppDataSource.getRepository(Student),
        "save"
      );
      spyAppDataSource.mockResolvedValue(createStudent);
      const result = await studentService.createStudentService(student);
      expect(result).toEqual(createStudent);
      spyAppDataSource.mockRestore();
    });
    it("test create student", async () => {
      const spyAppDataSource = jest.spyOn(
        AppDataSource.getRepository(Student),
        "save"
      );
      spyAppDataSource.mockResolvedValue(createStudent);
      try {
        const result = await studentService.createStudentService(student);
      } catch (e) {
        expect(e).toEqual(new Error("Error in creating student"));
      }
      spyAppDataSource.mockRestore();
    });
  });
  describe("Update student service test", () => {
    it("test update student", async () => {
      const spyAppDataSource = jest.spyOn(
        AppDataSource.getRepository(Student),
        "save"
      );
      spyAppDataSource.mockResolvedValue(createStudent);

      const result = await studentService.updateStudentService(student);

      expect(result).toEqual(createStudent);

      spyAppDataSource.mockRestore();
    });
    it("test update student fail", async () => {
      const spyAppDataSource = jest.spyOn(
        AppDataSource.getRepository(Student),
        "save"
      );
      spyAppDataSource.mockResolvedValue(createStudent);
      try {
        const result = await studentService.updateStudentService(student);
      } catch (e) {
        expect(e).toEqual(new Error("Error in updating user"));
      }
      spyAppDataSource.mockRestore();
    });
  });
  describe("Get student service test", () => {
    it("test get student", async () => {
      const spyAppDataSource = jest.spyOn(
        AppDataSource.getRepository(Student),
        "find"
      );
      spyAppDataSource.mockResolvedValue([createStudent]);

      const result = await studentService.getAllStudentsService();

      expect(result).toEqual([createStudent]);

      spyAppDataSource.mockRestore();
    });
    it("test get student fail", async () => {
      const spyAppDataSource = jest.spyOn(
        AppDataSource.getRepository(Student),
        "find"
      );
      spyAppDataSource.mockResolvedValue([createStudent]);
      try {
        const result = await studentService.getAllStudentsService();
      } catch (e) {
        expect(e).toEqual(new Error("Error in getting all users"));
      }
      spyAppDataSource.mockRestore();
    });
  });
  describe("Get student by id service test", () => {
    it("test get student by id", async () => {
      const spyAppDataSource = jest.spyOn(
        AppDataSource.getRepository(Student),
        "findOneBy"
      );
      spyAppDataSource.mockResolvedValue(createStudent);

      const result = await studentService.getStudentByIdService(1);

      expect(result).toEqual(createStudent);

      spyAppDataSource.mockRestore();
    });
    it("test get student by id fail", async () => {
      const spyAppDataSource = jest.spyOn(
        AppDataSource.getRepository(Student),
        "findOneBy"
      );
      spyAppDataSource.mockResolvedValue(createStudent);
      try {
        const result = await studentService.getStudentByIdService(1);
      } catch (e) {
        expect(e).toEqual(new Error("Error in getting user by id"));
      }
      spyAppDataSource.mockRestore();
    });
  });
  describe("Delete student by id service test", () => {
    it("test delete student by id", async () => {
      const spyGetDataSource = jest.spyOn(
        AppDataSource.getRepository(Student),
        "findOneBy"
      );
      spyGetDataSource.mockResolvedValue(createStudent);
      const spyAppDataSource = jest.spyOn(
        AppDataSource.getRepository(Student),
        "remove"
      );
      spyAppDataSource.mockResolvedValue(createStudent);

      const result = await studentService.deleteStudentService(
        createStudent.PersonID
      );

      expect(result).toEqual(createStudent);

      spyAppDataSource.mockRestore();
    });
    it("test delete student by id fail", async () => {
      const spyAppDataSource = jest.spyOn(
        AppDataSource.getRepository(Student),
        "remove"
      );
      spyAppDataSource.mockResolvedValue(createStudent);
      try {
        const result = await studentService.deleteStudentService(
          createStudent.PersonID
        );
      } catch (e) {
        expect(e).toEqual(new Error("Error in deleting user by id"));
      }
      spyAppDataSource.mockRestore();
    });
  });
});

import {
  createStudentService,
  deleteStudentService,
  findStudentService,
  getAllStudentService,
  mergeStudentService,
  saveStudentService,
} from "../studentService";
import { Student } from "../../entities/studentEntity";
import { BaseEntity, DeepPartial } from "typeorm";

describe("Student Service", () => {
  describe("Add new Student", () => {
    const addNewStudent = {
      name: "newName",
      gender: "Male",
      address: "newAddress",
      mobile: 112463268,
      birthday: "1997-11-15",
      age: 25,
    };

    test("Add New Student Success", async () => {
      Student.save = jest.fn().mockResolvedValue(addNewStudent);
      const res = await createStudentService(addNewStudent);
      expect(res).toEqual(addNewStudent);
    });

    test("Fail Add New Student", async () => {
      Student.save = jest.fn().mockRejectedValue(null);
      const res = await createStudentService(addNewStudent);
      expect(res).toEqual({ err: "Student Adding Failed" });
    });
  });

  describe("Get All Students", () => {
    const allStudents = [
      {
        id: 1,
        name: "newName1",
        gender: "Male",
        address: "newAddress1",
        mobile: "112463256",
        birthday: "1999-10-10",
        age: 23,
      },
    ];

    const body = [
      {
        id: 1,
        name: "newName1",
        gender: "Male",
        address: "newAddress1",
        mobile: "112463256",
        birthday: "1999-10-10",
        age: 23,
      },
    ];

    const getAllStudentsError = {
      err: "Students are not Found",
    };

    test("Get All Student Success", async () => {
      Student.find = jest.fn().mockResolvedValue(allStudents);
      const res = await getAllStudentService();
      expect(res).toEqual(body);
    });

    test("Fail Get All Student", async () => {
      Student.find = jest.fn().mockRejectedValue(null);
      const res = await getAllStudentService();
      expect(res).toEqual(getAllStudentsError);
    });
  });

  describe("Delete Student", () => {
    const deleteStudent = {
      id: 1,
      name: "newName1",
      gender: "Male",
      address: "newAddress1",
      mobile: "112463256",
      birthday: "1999-10-10",
      age: 23,
    };
    const id = 1;

    test("Delete Student Success", async () => {
      Student.delete = jest.fn().mockResolvedValue(deleteStudent);
      const res = await deleteStudentService(id);
      expect(res).toEqual(deleteStudent);
    });

    test("Fail Delete Student", async () => {
      Student.delete = jest.fn().mockRejectedValue(null);
      const res = await deleteStudentService(id);
      expect(res).toEqual({ err: "Error with Deleting Student" });
    });
  });

  describe("Update Student", () => {
    const findStudent = {
      id: 1,
      name: "newName1",
      gender: "Male",
      address: "newAddress1",
      mobile: "112463256",
      birthday: "1999-10-10",
      age: 23,
    };
    const id = 1;
    let student: Student;
    let body: DeepPartial<BaseEntity>;

    const changesStudent = {
      name: "newName1",
      gender: "Female",
      address: "newAddress1",
      mobile: "112463256",
      birthday: "1999-10-10",
      age: 23,
    };

    test("Find Student Success", async () => {
      Student.findOneBy = jest.fn().mockResolvedValue(findStudent);
      const res = await findStudentService(id);
      expect(res).toEqual(findStudent);
    });

    test("Merge Student Success", async () => {
      Student.merge = jest.fn().mockResolvedValue(changesStudent);
      const res = await mergeStudentService(student, body);
      expect(res).toEqual(changesStudent);
    });

    test("Save Student Success", async () => {
      Student.save = jest.fn().mockResolvedValue(changesStudent);
      const res = await saveStudentService(student);
      expect(res).toEqual(changesStudent);
    });

    test("Find Student Fail", async () => {
      Student.findOneBy = jest.fn().mockRejectedValue(null);
      const res = await findStudentService(id);
      expect(res).toEqual({ err: "Cannot Find Student" });
    });

    test("save Student Fail", async () => {
      Student.save = jest.fn().mockRejectedValue(null);
      const res = await saveStudentService(student);
      expect(res).toEqual({ err: "Cannot Save Student" });
    });
  });
});

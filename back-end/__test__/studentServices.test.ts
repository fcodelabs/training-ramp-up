import { Request, Response } from "express";
import { Student } from "../src/models/StudentModel";
import { AppDataSource } from "../src/configs/dbConfig";
const {
  getAllStudents,
  addStudentDetails,
  updateStudentDetails,
  deleteAStudent,
} = require("../src/services/studentServices");

describe("getAllStudents", () => {
  test("should return all students from database", async () => {
    const mockStudents = [
      {
        id: 1,
        name: "John",
        gender: "male",
        address: "123 Main St",
        mobile: "123-456-7890",
        dob: "2000-01-01",
        age: 21,
      },
      {
        id: 2,
        name: "Jane",
        gender: "female",
        address: "123 Main St",
        mobile: "123-456-7890",
        dob: "2000-01-01",
        age: 21,
      },
    ];
    const mockFind = jest.fn().mockResolvedValue(mockStudents);
    AppDataSource.getRepository = jest.fn().mockReturnValue({
      find: mockFind,
    });

    const result = await getAllStudents();

    expect(result).toEqual(mockStudents);
    expect(mockFind).toHaveBeenCalledTimes(1);
  });
});

describe("addStudentDetails", () => {
  test("should add a new student to database", async () => {
    const mockRequest = {
      body: {
        name: "John",
        gender: "male",
        address: "123 Main St",
        mobile: "123-456-7890",
        dob: "2000-01-01",
        age: 21,
      },
    };
    const mockCreate = jest.fn().mockReturnValue(mockRequest.body);
    const mockSave = jest.fn().mockResolvedValue(mockRequest.body);
    AppDataSource.getRepository = jest.fn().mockReturnValue({
      create: mockCreate,
      save: mockSave,
    });
    global.io = { emit: jest.fn() };
    const result = await addStudentDetails(mockRequest);

    expect(result).toEqual(mockRequest.body);
    expect(mockCreate).toHaveBeenCalledTimes(1);
    expect(mockCreate).toHaveBeenCalledWith(mockRequest.body);
    expect(mockSave).toHaveBeenCalledTimes(1);
    expect(mockSave).toHaveBeenCalledWith(mockRequest.body);
  });

  test("should emit a notification when a new student is added", async () => {
    const mockRequest = {
      body: {
        name: "John",
        gender: "male",
        address: "123 Main St",
        mobile: "123-456-7890",
        dob: "2000-01-01",
        age: 21,
      },
    };
    const mockCreate = jest.fn().mockReturnValue(mockRequest.body);
    const mockSave = jest.fn().mockResolvedValue(mockRequest.body);
    AppDataSource.getRepository = jest.fn().mockReturnValue({
      create: mockCreate,
      save: mockSave,
    });
    global.io = { emit: jest.fn() };

    const result = await addStudentDetails(mockRequest);

    expect(global.io.emit).toHaveBeenCalledTimes(1);
    expect(global.io.emit).toHaveBeenCalledWith("notify", {
      message: "New student added",
    });
  });
});

describe("updateStudentDetails", () => {
  test("should update a student in database", async () => {
    const mockRequest = {
      body: {
        name: "John",
        gender: "male",
        address: "123 Main St",
        mobile: "123-456-7890",
        dob: "2000-01-01",
        age: 21,
      },
      params: {
        id: 1,
      },
    };
    const mockfindOne = jest.fn().mockResolvedValue(mockRequest.params.id);
    const mockMerge = jest.fn().mockReturnValue(mockRequest.body);
    const mockSave = jest.fn().mockResolvedValue(mockRequest.body);
    AppDataSource.getRepository = jest.fn().mockReturnValue({
      findOne: mockfindOne,
      merge: mockMerge,
      save: mockSave,
    });
    global.io = { emit: jest.fn() };
    const result = await updateStudentDetails(mockRequest);

    expect(result).toEqual(mockRequest.body);
    expect(mockfindOne).toHaveBeenCalledTimes(1);
    expect(mockMerge).toHaveBeenCalledTimes(1);
    expect(mockMerge).toHaveBeenCalledWith(
      mockRequest.params.id,
      mockRequest.body
    );
    expect(mockSave).toHaveBeenCalledTimes(1);
    expect(mockSave).toHaveBeenCalledWith(mockRequest.params.id);
  });
});

describe("deleteAStudent", () => {
  it("deletes a student and emits a notification", async () => {
    const deleteMock = jest.fn().mockResolvedValue({ id: 1 });

    AppDataSource.getRepository = jest
      .fn()
      .mockReturnValue({ delete: deleteMock });

    const emitMock = jest.fn();
    global.io = { emit: emitMock };

    const result = await deleteAStudent(1);

    expect(deleteMock).toHaveBeenCalledWith(1);

    expect(emitMock).toHaveBeenCalledWith("notify", {
      message: "A student deleted",
    });

    expect(result).toEqual({ id: 1 });
  });
});

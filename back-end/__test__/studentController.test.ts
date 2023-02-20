import {
  getStudents,
  addStudent,
  updateStudent,
  deleteStudent,
} from "../src/controllers/studentController";
import * as studentServices from "../src/services/studentServices";
import * as validateStudent from "../src/models/StudentModel";
const generateOutput = require("../src/utils/outputFactory");

describe("getStudents", () => {
  it("should return a success response with students array if getAllStudents succeeds", async () => {
    const mockStudents = [
      {
        id: 1,
        name: "Piyumi",
        gender: "Female",
        address: "Galle",
        mobile: "0765867087",
        dob: new Date("1998-01-01"),
        age: 25,
      },
      {
        id: 2,
        name: "Piyumi",
        gender: "Female",
        address: "Galle",
        mobile: "0765867087",
        dob: new Date("1998-01-01"),
        age: 25,
      },
    ];
    jest
      .spyOn(studentServices, "getAllStudents")
      .mockResolvedValue(mockStudents);
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis(),
    } as any;
    await getStudents(null, mockRes);
    expect(mockRes.status).toHaveBeenCalledWith(201);
    expect(mockRes.send).toHaveBeenCalledWith(
      generateOutput(201, "success", mockStudents)
    );
  });

  it("should return an error response if getAllStudents fails", async () => {
    jest
      .spyOn(studentServices, "getAllStudents")
      .mockRejectedValue(new Error("Something went wrong"));
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis(),
    } as any;
    await getStudents(null, mockRes);
    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.send).toHaveBeenCalledWith(
      generateOutput(500, "error", "Something went wrong")
    );
  });
});

describe("addStudent", () => {
  it("should return a success response with saved student object if validation and addStudentDetails succeed", async () => {
    const mockReq = {
      body: {
        name: "Piyumi",
        gender: "Female",
        address: "Galle",
        mobile: "0765867087",
        dob: new Date("1998-01-01"),
        age: 25,
      },
    } as any;
    const mockSavedStudent = {
      id: 1,
      name: "Piyumi",
      gender: "Female",
      address: "Galle",
      mobile: "0765867087",
      dob: new Date("1998-01-01"),
      age: 25,
    };
    jest
      .spyOn(studentServices, "addStudentDetails")
      .mockResolvedValue(mockSavedStudent);
    jest.spyOn(validateStudent, "validateStudent").mockReturnValue(null);
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis(),
    } as any;
    await addStudent(mockReq, mockRes);
    expect(mockRes.status).toHaveBeenCalledWith(201);
    expect(mockRes.send).toHaveBeenCalledWith(
      generateOutput(201, "success", mockSavedStudent)
    );
  });

  it("should return a validation error response if validation fails", async () => {
    const mockReq = {
      body: {
        name: "",
        gender: "Female",
        address: "Galle",
        mobile: "0765867087",
        dob: new Date("1998-01-01"),
        age: 25,
      },
    } as any;
    const mockValidationError = new Error("Name is required");
    jest
      .spyOn(validateStudent, "validateStudent")
      .mockReturnValue(mockValidationError);
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis(),
    } as any;
    await addStudent(mockReq, mockRes);
    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.send).toHaveBeenCalledWith(
      generateOutput(400, "error", mockValidationError.message)
    );
  });

  it("should return an error response if addStudentDetails fails", async () => {
    const mockReq = {
      body: {
        id: 1,
        name: "Piyumi",
        gender: "Female",
        address: "Galle",
        mobile: "0765867087",
        dob: new Date("1998-01-01"),
        age: 25,
      },
    } as any;
    jest
      .spyOn(studentServices, "addStudentDetails")
      .mockRejectedValue(new Error("Database error"));
    jest.spyOn(validateStudent, "validateStudent").mockReturnValue(null);
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis(),
    } as any;
    await addStudent(mockReq, mockRes);
    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.send).toHaveBeenCalledWith(
      generateOutput(500, "error", "Something went wrong")
    );
  });
});

describe("updateStudent", () => {
  it("should return updated student details if valid data is provided", async () => {
    const mockReq = {
      body: {
        name: "Piyumi",
        gender: "Female",
        address: "Galle",
        mobile: "0765867087",
        dob: new Date("1998-01-01"),
        age: 25,
      },
      params: {
        id: 1,
      },
    } as any;

    const updatedStudent = {
      id: 1,
      name: "Piyumi",
      gender: "Female",
      address: "Galle",
      mobile: "0765867087",
      dob: new Date("1998-01-01"),
      age: 25,
    };
    jest
      .spyOn(studentServices, "updateStudentDetails")
      .mockResolvedValue(updatedStudent);
    jest.spyOn(validateStudent, "validateStudent").mockReturnValue(null);

    const mockRes = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis(),
    } as any;

    await updateStudent(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(201);
    expect(mockRes.send).toHaveBeenCalledWith(
      generateOutput(201, "success", updatedStudent)
    );
  });

  it("should return a validation error if invalid data is provided", async () => {
    const mockReq = {
      body: {
        name: "Piyumi",
        gender: "Female",
        address: "Galle",
        mobile: "0765867087",
        dob: new Date("1998-01-01"),
        age: 25,
      },
      params: {
        id: 1,
      },
    } as any;

    const mockValidationError = new Error("Name is required");
    jest
      .spyOn(validateStudent, "validateStudent")
      .mockReturnValue(mockValidationError);
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis(),
    } as any;
    // Call the 'updateStudent' function with the mock request and response objects
    await updateStudent(mockReq, mockRes);

    // Check that the response status and body are as expected
    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.send).toHaveBeenCalledWith(
      generateOutput(400, "error", mockValidationError.message)
    );
  });

  it("should return a server error if the 'updateStudentDetails' function throws an error", async () => {
    const mockReq = {
      body: {
        name: "Piyumi",
        gender: "Female",
        address: "Galle",
        mobile: "0765867087",
        dob: new Date("1998-01-01"),
        age: 25,
      },
      params: {
        id: 1,
      },
    } as any;
    jest
      .spyOn(studentServices, "updateStudentDetails")
      .mockRejectedValue(new Error("Database error"));
    jest.spyOn(validateStudent, "validateStudent").mockReturnValue(null);
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis(),
    } as any;
    await updateStudent(mockReq, mockRes);
    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.send).toHaveBeenCalledWith(
      generateOutput(500, "error", "Something went wrong")
    );
  });
});

describe("deleteStudent", () => {
  it("should delete a student and return a success message", async () => {
    // Set up test data and mock the deleteAStudent service
    const mockReq = {
      params: {
        id: 1,
      },
    } as any;
    const mockDeletedStudent = {
      id: 1,
      name: "Piyumi",
      gender: "Female",
      address: "Galle",
      mobile: "0765867087",
      dob: new Date("1998-01-01"),
      age: 25,
    } as any;

    jest
      .spyOn(studentServices, "deleteAStudent")
      .mockResolvedValue(mockDeletedStudent);
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis(),
    } as any;
    // Call the deleteStudent function
    await deleteStudent(mockReq, mockRes);

    // Check that the response status and output are correct
    expect(mockRes.status).toHaveBeenCalledWith(201);
    expect(mockRes.send).toHaveBeenCalledWith({
      statusCode: 201,
      message: "success",
      data: mockDeletedStudent,
    });
  });

  it("should return an error message if something goes wrong", async () => {
    // Set up test data and mock the deleteAStudent service to throw an error
    const mockReq = {
      params: {
        id: 1,
      },
    } as any;
    const mockDeletedStudent = {
      id: 1,
      name: "Piyumi",
      gender: "Female",
      address: "Galle",
      mobile: "0765867087",
      dob: new Date("1998-01-01"),
      age: 25,
    } as any;

    jest
      .spyOn(studentServices, "deleteAStudent")
      .mockRejectedValue(new Error("Something went wrong"));
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis(),
    } as any;
    // Call the deleteStudent function
    await deleteStudent(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.send).toHaveBeenCalledWith({
      statusCode: 500,
      message: "error",
      data: "Something went wrong",
    });
  });
});

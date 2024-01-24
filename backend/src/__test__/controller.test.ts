import { Request, Response } from "express";
import { StudentController } from "../controller/studentController";
import { StudentService } from "../services/studentService";
import { getSocketInstance } from "../services/socketService";
import { Student } from "../entity/Student";

jest.mock("../services/studentService");
jest.mock("../services/socketService");
jest.mock("../entity/Student");

const mockSave = jest.fn();
const mockFindOne = jest.fn();
jest.mock("../entity/Student", () => ({
  PrimaryGeneratedColumn: jest.fn(),
  Entity: jest.fn(),
  Column: jest.fn(),
  PrimaryColumn: jest.fn(),
  getConnection: jest.fn().mockReturnValue({
    getRepository: jest.fn().mockReturnValue({
      save: mockSave,
      findOne: mockFindOne,
    }),
  }),
}));

describe("StudentController", () => {
  const mockRequest = {};
  const mockResponse = {
    status: jest.fn().mockReturnThis(),
    send: jest.fn(),
  };
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should send all students successfully", async () => {
    const expectedStudents = [
      { id: 1, name: "John Doe" },
      { id: 2, name: "Jane Doe" },
    ];
    (StudentService.prototype.getAllStudents as jest.Mock).mockResolvedValue(
      expectedStudents
    );

    const studentController = new StudentController();

    await studentController.all(mockRequest as Request, mockResponse as any);

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.send).toHaveBeenCalledWith(expectedStudents);
  });

  it("should handle an error and send a 500 response", async () => {
    const expectedError = new Error("An error occurred");
    (StudentService.prototype.getAllStudents as jest.Mock).mockRejectedValue(
      expectedError
    );

    const studentController = new StudentController();

    await studentController.all(mockRequest as Request, mockResponse as any);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.send).toHaveBeenCalledWith(expectedError);
  });
});

//add one student test

describe("StudentController", () => {
  const mockRequest = {
    body: {
      id: 1,
      name: "John Doe",
      gender: "Male",
      address: "123 Main St",
      mobile: "123-456-7890",
      birthday: "2000-01-01",
      age: 21,
    },
    params: {
      userId: "user123",
    },
  };
  const mockResponse = {
    status: jest.fn().mockReturnThis(),
    send: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should add one student successfully", async () => {
    const expectedStudent = {};
    (StudentService.prototype.createStudent as jest.Mock).mockResolvedValue(
      expectedStudent
    );

    const studentController = new StudentController();

    await studentController.add(mockRequest as any, mockResponse as any);

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.send).toHaveBeenCalledWith(expectedStudent);
  });

  it("should handle an error and send a 500 response", async () => {
    const expectedError = new Error("An error occurred");
    (StudentService.prototype.createStudent as jest.Mock).mockRejectedValue(
      expectedError
    );

    const studentController = new StudentController();

    await studentController.add(mockRequest as any, mockResponse as any);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.send).toHaveBeenCalledWith(expectedError);
  });
});

//update one student test

describe("StudentController", () => {
  const mockRequest = {
    body: {
      id: 1,
      name: "John Doe",
    },
    params: {
      userId: "user123",
    },
  };
  const mockResponse = {
    status: jest.fn().mockReturnThis(),
    send: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should update one student successfully", async () => {
    const expectedStudent = {};
    (StudentService.prototype.updateStudent as jest.Mock).mockResolvedValue(
      expectedStudent
    );

    const studentController = new StudentController();

    await studentController.update(mockRequest as any, mockResponse as any);

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.send).toHaveBeenCalledWith(expectedStudent);
  });

  it("should handle an error and send a 500 response", async () => {
    const expectedError = new Error("An error occurred");
    (StudentService.prototype.updateStudent as jest.Mock).mockRejectedValue(
      expectedError
    );

    const studentController = new StudentController();

    await studentController.update(mockRequest as any, mockResponse as any);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.send).toHaveBeenCalledWith(expectedError);
  });
});

//delete one student test

describe("StudentController", () => {
  const mockRequest = {
    params: {
      id: 1,
      userId: "user123",
    },
  };
  const mockResponse = {
    status: jest.fn().mockReturnThis(),
    send: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should delete one student successfully", async () => {
    const expectedStudent = {};
    (StudentService.prototype.removeStudent as jest.Mock).mockResolvedValue(
      expectedStudent
    );

    const studentController = new StudentController();

    await studentController.remove(mockRequest as any, mockResponse as any);

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.send).toHaveBeenCalledWith(expectedStudent);
  });

  it("should handle an error and send a 500 response", async () => {
    const expectedError = new Error("An error occurred");
    (StudentService.prototype.removeStudent as jest.Mock).mockRejectedValue(
      expectedError
    );

    const studentController = new StudentController();

    await studentController.remove(mockRequest as any, mockResponse as any);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.send).toHaveBeenCalledWith(expectedError);
  });
});

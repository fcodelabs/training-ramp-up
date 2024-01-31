import { Server } from "socket.io";
import { StudentController } from "../controllers/student";
import { StudentService } from "../services/student";
import { Request, Response } from "express";

// Mock StudentService
jest.mock("../services/student", () => ({
  StudentService: {
    create: jest.fn(),
    findAll: jest.fn(),
    edit: jest.fn(),
    delete: jest.fn(),
  },
}));

describe("StudentController", () => {
  let io: Server;
  let studentController: StudentController;
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    io = new Server();
    studentController = new StudentController(io);
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it("should create a new student", async () => {
    const mockStudent = {
      id: 1,
      name: "Test student",
      gender: "Male",
      address: "123 Test St",
      mobile: "1234567890",
      dob: new Date("2000-01-01"),
      age: 21,
    };
    req = { body: { name: "Test student" } };

    (jest.spyOn(StudentService, "create") as jest.Mock).mockResolvedValue(
      mockStudent,
    );
    await studentController.create(req as Request, res as Response);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(mockStudent);
  });

  it("should return 500 if creating a student fails", async () => {
    req = { body: { name: "John Doe" } };

    (jest.spyOn(StudentService, "create") as jest.Mock).mockRejectedValue(
      new Error(),
    );

    await studentController.create(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: "An error occurred while creating the student.",
    });
  });

  it("should fetch all students", async () => {
    const mockStudents = [
      { id: 1, name: "Test student 1" },
      { id: 2, name: "Test student 2" },
    ];

    req = {};

    (jest.spyOn(StudentService, "findAll") as jest.Mock).mockResolvedValue(
      mockStudents,
    );

    await studentController.findAll(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockStudents);
  });

  it("should return 500 if fetching students fails", async () => {
    req = {};

    (jest.spyOn(StudentService, "findAll") as jest.Mock).mockRejectedValue(
      new Error(),
    );

    await studentController.findAll(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: "An error occurred while fetching the students.",
    });
  });

  it("should edit a student", async () => {
    const mockStudent = { id: 1, name: "John Doe" };

    req = {
      params: { id: "1" },
      body: { name: "John Doe" },
    };

    (jest.spyOn(StudentService, "edit") as jest.Mock).mockResolvedValue(
      mockStudent,
    );

    await studentController.edit(req as Request, res as Response);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockStudent);
  });

  it("should return 500 if editing a student fails", async () => {
    req = {
      params: { id: "1" },
      body: { name: "John Doe" },
    };

    (jest.spyOn(StudentService, "edit") as jest.Mock).mockRejectedValue(
      new Error(),
    );

    await studentController.edit(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: "An error occurred while editing the student.",
    });
  });

  it("should delete a student", async () => {
    req = { params: { id: "1" } };

    (jest.spyOn(StudentService, "delete") as jest.Mock).mockResolvedValue(true);

    await studentController.delete(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(204);
  });

  it("should return 500 if deleting a student fails", async () => {
    req = { params: { id: "1" } };

    (jest.spyOn(StudentService, "delete") as jest.Mock).mockRejectedValue(
      new Error(),
    );

    await studentController.delete(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: "An error occurred while deleting the student.",
    });
  });
});

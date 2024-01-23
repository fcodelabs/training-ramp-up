// StudentService.test.ts

import { StudentService } from "../services/studentService";
import { AppDataSource } from "../config/data-source";
import { Student } from "../entity/Student";

jest.mock("../config/data-source");

// Mock the AppDataSource getRepository method
const mockGetRepository = jest.fn();

// Mock the repository methods
const mockFind = jest.fn();
const mockFindOne = jest.fn();
const mockCreate = jest.fn();
const mockSave = jest.fn();
const mockRemove = jest.fn();
const mockUpdate = jest.fn();

beforeEach(() => {
  // Reset mocks and create fresh instances for each test
  jest.clearAllMocks();

  // Mock the AppDataSource getRepository method to return the mock repository methods
  (AppDataSource.getRepository as jest.Mock).mockImplementation(() => ({
    find: mockFind,
    findOne: mockFindOne,
    create: mockCreate,
    save: mockSave,
    remove: mockRemove,
    update: mockUpdate,
  }));
});

describe("StudentService", () => {
  let studentService: StudentService;

  beforeEach(() => {
    studentService = new StudentService();
  });

  it("should get all students successfully", async () => {
    // Arrange
    const expectedStudents = [
      { id: 1, name: "John Doe" },
      { id: 2, name: "Jane Doe" },
    ];
    mockFind.mockResolvedValue(expectedStudents);

    // Act
    const result = await studentService.getAllStudents();

    // Assert
    expect(result).toEqual(expectedStudents);
  });

  it("should get a student by id successfully", async () => {
    // Arrange
    const expectedStudent = { id: 1, name: "John Doe" };
    mockFindOne.mockResolvedValue(expectedStudent);

    // Act
    const result = await studentService.getStudentById(1);

    // Assert
    expect(result).toEqual(expectedStudent);
  });

  it("should create a new student successfully", async () => {
    const student = new Student();
    const expectedStudent = {
      id: 1,
      name: "John Doe",
      gender: "Male",
      address: "123 Main St",
      mobile: "123-456-7890",
      birthday: new Date(),
      age: 21,
    };

    mockCreate.mockReturnValue(expectedStudent);
    mockSave.mockResolvedValue(expectedStudent);

    // Act
    const result = await studentService.createStudent(
      1,
      "John Doe",
      "Male",
      "123 Main St",
      "123-456-7890",
      new Date(),
      21
    );

    // Assert
    expect(result).toEqual(expectedStudent);
    expect(mockSave).toHaveBeenCalledWith(expectedStudent);
  });

  it("should remove a student successfully", async () => {
    // Arrange
    const expectedMessage = "Student has been removed";
    mockFindOne.mockResolvedValue({ id: 1, name: "John Doe" });

    // Act
    const result = await studentService.removeStudent(1);

    // Assert
    expect(result).toEqual(expectedMessage);
    expect(mockRemove).toHaveBeenCalledWith({ id: 1, name: "John Doe" });
  });

  it("should update a student successfully", async () => {
    // Arrange
    const expectedUpdatedStudent = { affected: 1 };
    mockUpdate.mockResolvedValue({ affected: 1 });

    // Act
    const result = await studentService.updateStudent(1, {
      name: "Updated John Doe",
    });

    // Assert
    expect(result).toEqual(expectedUpdatedStudent);
    expect(mockUpdate).toHaveBeenCalledWith(1, { name: "Updated John Doe" });
  });
});

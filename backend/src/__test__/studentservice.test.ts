// StudentService.test.ts

import { StudentService } from "../services/studentService";
import { AppDataSource } from "../config/data-source";
import { Student } from "../entity/student";

jest.mock("../config/data-source");

const mockFind = jest.fn();
const mockFindOne = jest.fn();
const mockCreate = jest.fn();
const mockSave = jest.fn();
const mockRemove = jest.fn();
const mockUpdate = jest.fn();

beforeEach(() => {
  // Reset mocks and create fresh instances for each test
  jest.clearAllMocks();

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
    
    const expectedStudents = [
      { id: 1, name: "John Doe" },
      { id: 2, name: "Jane Doe" },
    ];
    mockFind.mockResolvedValue(expectedStudents);

    
    const result = await studentService.getAllStudents();

    
    expect(result).toEqual(expectedStudents);
  });

  it("should get a student by id successfully", async () => {
    
    const expectedStudent = { id: 1, name: "John Doe" };
    mockFindOne.mockResolvedValue(expectedStudent);

    
    const result = await studentService.getStudentById(1);

    
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

    
    const result = await studentService.createStudent(
      1,
      "John Doe",
      "Male",
      "123 Main St",
      "123-456-7890",
      new Date(),
      21
    );

    
    expect(result).toEqual(expectedStudent);
    expect(mockSave).toHaveBeenCalledWith(expectedStudent);
  });

  it("should remove a student successfully", async () => {
    
    const expectedMessage = "Student has been removed";
    mockFindOne.mockResolvedValue({ id: 1, name: "John Doe" });

    
    const result = await studentService.removeStudent(1);

    
    expect(result).toEqual(expectedMessage);
    expect(mockRemove).toHaveBeenCalledWith({ id: 1, name: "John Doe" });
  });

  it("should update a student successfully", async () => {
    
    const expectedUpdatedStudent = { affected: 1 };
    mockUpdate.mockResolvedValue({ affected: 1 });

    
    const result = await studentService.updateStudent(1, {
      name: "Updated John Doe",
    });

    
    expect(result).toEqual(expectedUpdatedStudent);
    expect(mockUpdate).toHaveBeenCalledWith(1, { name: "Updated John Doe" });
  });
});

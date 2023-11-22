import request from "supertest";
import {
  createStudent,
  getStudent,
  listStudents,
  StudentObject,
} from "../services/student.services";
import { app } from "..";
import { Student } from "../entity/student";

jest.mock("../entity/student", () => {
  const mockStudent = {
    find: jest.fn(),
    findOneBy: jest.fn(),
    save: jest.fn(),
  };
  return {
    Student: mockStudent,
  };
});

jest.mock("../middlewares/auth.middleware", () => ({
  AuthenticationMiddleware: jest.fn().mockImplementation((allowedUser) => {
    return async (request: any, response: any, next: any) => {
      next();
    };
  }),
}));

describe("Test StudentService", () => {
  // const StudentService:StudentSe
  it("Should list all the Students", async () => {
    // jest.spyOn(Student,"find")
    (Student.find as jest.Mock).mockResolvedValue([
      {
        id: 1,
        name: "John Doe",
        gender: "Male",
        address: "123 Main St",
        mobileNo: "1234567890",
        dateOfBirth: "2000-01-01",
        age: 21,
      },
    ]);

    const students: StudentObject[] = await listStudents();

    const expectedResponse: StudentObject[] = [
      {
        id: 1,
        name: "John Doe",
        gender: "Male",
        address: "123 Main St",
        mobileNo: "1234567890",
        dateOfBirth: "2000-01-01",
        age: 21,
      },
    ];

    expect(students).toEqual(expectedResponse);
  });
  it("Should retrieve Student by ID", async () => {
    (Student.findOneBy as jest.Mock).mockResolvedValue({
      id: 1,
      name: "John Doe",
      gender: "Male",
      address: "123 Main St",
      mobileNo: "1234567890",
      dateOfBirth: "2000-01-01",
      age: 21,
    });

    const students: StudentObject | null = await getStudent(1);

    const expectedResponse: StudentObject = {
      id: 1,
      name: "John Doe",
      gender: "Male",
      address: "123 Main St",
      mobileNo: "1234567890",
      dateOfBirth: "2000-01-01",
      age: 21,
    };
    expect(students).toEqual(expectedResponse);
  });
  it("Should create Student", async () => {
    (Student.save as jest.Mock).mockResolvedValue({
      id: 1,
      name: "John Doe",
      gender: "Male",
      address: "123 Main St",
      mobileNo: "1234567890",
      dateOfBirth: "2000-01-01",
      age: 21,
    });

    const studentData: Omit<StudentObject, "id"> = {
      name: "John Doe",
      gender: "Male",
      address: "123 Main St",
      mobileNo: "1234567890",
      dateOfBirth: "2000-01-01",
      age: 21,
    };

    const student: StudentObject = await createStudent(studentData);
    console.log(student);

    const expectedResponse: StudentObject = {
      id: 1,
      name: "John Doe",
      gender: "Male",
      address: "123 Main St",
      mobileNo: "1234567890",
      dateOfBirth: "2000-01-01",
      age: 21,
    };

    expect(student).toEqual(expectedResponse);

    expect(Student.save).toHaveBeenCalledWith(studentData);
  });
});

describe("GET /api/students/", () => {
  test("return a list of students", async () => {
    const res = await request(app).get("/api/students");
    const expectedResponse: StudentObject[] = [
      {
        id: 1,
        name: "John Doe",
        gender: "Male",
        address: "123 Main St",
        mobileNo: "1234567890",
        dateOfBirth: "2000-01-01",
        age: 21,
      },
    ];

    expect(res.body).toEqual(expectedResponse);
  });
});

describe("GET /api/students/:id", () => {
  test("return a student by ID", async () => {
    const res = await request(app)
      .get("/api/students/1")
      .set("Cookie", "accessToken=validToken");
    console.log("res", res.body);
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: 1,
      name: "John Doe",
      gender: "Male",
      address: "123 Main St",
      mobileNo: "1234567890",
      dateOfBirth: "2000-01-01",
      age: 21,
    });
  });
});
describe("POST /api/students/", () => {
  test("create a student ", async () => {
    const studentData = {
      name: "Jane Doe",
      gender: "Female",
      address: "456 Second St",
      mobileNo: "9876543210",
      dateOfBirth: "1998-05-15",
      age: 25,
    };

    const res = await request(app)
      .post("/api/students")
      .set("Cookie", "accessToken=adminToken")
      .send(studentData);
    console.log("data", res.body);
    expect(res.status).toBe(201);
    expect(res.body).toEqual({
      id: expect.any(Number),
      ...studentData,
    });
  });
});

const { regStudent } = require("../src/controllers/userController");
import * as userServices from "../src/services/userServices";

describe("regStudent function", () => {
  it("should handle validation errors", async () => {
    // Create mock objects and functions
    const req = { body: { email: "invalid-email", password: "password" } };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis(),
    };
    const next = jest.fn();

    // Call the function with mock objects
    await regStudent(req, res, next);

    // Check that the response was sent with a 400 status and an error message
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith({
      data: '"email" must be a valid email',
      message: "error",
      statusCode: 400,
    });
  });

  it("should handle registration errors", async () => {
    // Create mock objects and functions
    const req = { body: { email: "john@example.com", password: "Admin@123" } };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
    const next = jest.fn();

    jest.spyOn(userServices, "registerStudent").mockResolvedValue(null);
    await regStudent(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith({
      data: "error",
      statusCode: 200,
      message: "error",
    });
  });

  it("should handle successful registration", async () => {
    // Create mock objects and functions
    const req = { body: { email: "john@example.com", password: "Admin@123" } };
    const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
    const next = jest.fn();
    const registeredStudent = {
      email: "john@example.com",
      password: "Admin@123",
      userRole: "student",
    };

    jest
      .spyOn(userServices, "registerStudent")
      .mockResolvedValue(registeredStudent);

    await regStudent(req, res, next);

    expect(res.status).toHaveBeenCalledWith(201);
    console.log(res.send.mock.calls);
    expect(res.send).toHaveBeenCalledWith({
      statusCode: 201,
      message: "success",
      data: registeredStudent,
    });
  });
});

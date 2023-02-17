const {
  registerStudent,
  handleRefreshTokenService,
  loginService,
} = require("../src/services/userServices");
const { AppDataSource } = require("../src/configs/dbConfig");
const bcrypt = require("bcrypt");
import { User } from "../src/models/userModel";

describe("registerStudent function", () => {
  it("should create and return a new student", async () => {
    const mockEmail = "test@test.com";
    const mockPassword = "testpassword";
    const mockRequest = {
      body: {
        email: mockEmail,
        password: mockPassword,
      },
    };
    const mockSalt = "mock-salt";
    const mockHashedPassword = "mock-hashed-password";
    const mockNewUser = {
      email: mockEmail,
      password: mockHashedPassword,
      userRole: "student",
    };
    const mockStudent = {
      id: "123",
      email: mockEmail,
      password: mockHashedPassword,
      userRole: "student",
    };
    const mockManager = {
      create: jest.fn().mockReturnValue(mockStudent),
      save: jest.fn().mockReturnValue(mockStudent),
    };
    const mockRepository = {
      findOneBy: jest.fn().mockReturnValue(null),
    };
    AppDataSource.getRepository = jest.fn().mockReturnValue(mockRepository);
    AppDataSource.manager = mockManager;
    bcrypt.genSalt = jest.fn().mockResolvedValue(mockSalt);
    bcrypt.hash = jest.fn().mockResolvedValue(mockHashedPassword);

    const result = await registerStudent(mockRequest);

    expect(result).toEqual(mockStudent);
    expect(AppDataSource.getRepository).toHaveBeenCalledTimes(1);
    expect(mockRepository.findOneBy).toHaveBeenCalledTimes(1);
    expect(mockRepository.findOneBy).toHaveBeenCalledWith({ email: mockEmail });
    expect(mockManager.create).toHaveBeenCalledTimes(1);
    expect(mockManager.create).toHaveBeenCalledWith(User, mockNewUser);
    expect(mockManager.save).toHaveBeenCalledTimes(1);
    expect(mockManager.save).toHaveBeenCalledWith(mockStudent);
    expect(bcrypt.genSalt).toHaveBeenCalledTimes(1);
    expect(bcrypt.genSalt).toHaveBeenCalledWith(10);
    expect(bcrypt.hash).toHaveBeenCalledTimes(1);
    expect(bcrypt.hash).toHaveBeenCalledWith(mockPassword, mockSalt);
  });

  it("should return false if email is already in use", async () => {
    const mockEmail = "test@test.com";
    const mockRequest = {
      body: {
        email: mockEmail,
      },
    };
    const mockRepository = {
      findOneBy: jest.fn().mockReturnValue({ email: mockEmail }),
    };
    AppDataSource.getRepository = jest.fn().mockReturnValue(mockRepository);

    const result = await registerStudent(mockRequest);

    expect(result).toEqual(false);
    expect(AppDataSource.getRepository).toHaveBeenCalledTimes(1);
    expect(mockRepository.findOneBy).toHaveBeenCalledTimes(1);
    expect(mockRepository.findOneBy).toHaveBeenCalledWith({ email: mockEmail });
  });
});

const jwtMock = {
  verify: jest.fn(),
  sign: jest.fn(() => "mockAccessToken"),
};

describe("handleRefreshTokenService", () => {
  it("throws an error when no refresh token is provided", async () => {
    const req = { cookies: {} };

    await expect(handleRefreshTokenService(req, jwtMock)).rejects.toThrow(
      "Invalid Token"
    );
  });
});

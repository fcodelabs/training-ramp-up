import { UserController } from "../controllers/userController";
import { UserService } from "../services/userService";
import { User } from "../entity/user";

// write tests for the UserController class

jest.mock("../services/userService");
jest.mock("../services/socketService");
jest.mock("../services/emailService");

describe("UserController", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should login successfully", async () => {
    const mockRequest = {
      body: {
        email: "",
        password: "",
      },
    };
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const user = new User();
    user.comparePassword = jest.fn().mockResolvedValue(true);
    (UserService.prototype.findByEmail as jest.Mock).mockResolvedValue(user);
    const userController = new UserController();

    await userController.login(mockRequest as any, mockResponse as any);

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({
      token: expect.any(String),
    });
  });

  it("should handle an error and send a 500 response", async () => {
    const mockRequest = {
      body: {
        email: "",
        password: "",
      },
    };
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    (UserService.prototype.findByEmail as jest.Mock).mockRejectedValue(
      new Error("An error occurred")
    );
    const userController = new UserController();

    await userController.login(mockRequest as any, mockResponse as any);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({
      error: "Internal Server Error",
    });
  });

  it("should send an email successfully", async () => {
    const mockRequest = {
      body: {
        email: "thambarasahassaka@gmail.com",
        role: "test",
        name: "test",
      },
      params: {
        socketId: "socket123",
      },
    };

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const user = new User();
    user.verified = false;
    user.comparePassword = jest.fn().mockResolvedValue(true);
    (UserService.prototype.findByEmail as jest.Mock).mockResolvedValue(user);
    const userController = new UserController();

    await userController.email(mockRequest as any, mockResponse as any);

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: "Signup link sent successfully",
      isVerified: false,
      tempToken: expect.any(String),
    });
  });

  it("should handle an error and send a 500 response", async () => {
    const mockRequest = {
      body: {
        email: "test",
        role: "test",
        name: "test",
      },
      params: {
        socketId: "socket123",
      },
    };

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const user = new User();
    user.verified = true;
    user.comparePassword = jest.fn().mockResolvedValue(true);
    (UserService.prototype.findByEmail as jest.Mock).mockResolvedValue(user);
    const userController = new UserController();

    await userController.email(mockRequest as any, mockResponse as any);

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: "email already exists",
      isVerified: true,
    });
  });

  it("should handle an error and send a 500 response", async () => {
    const mockRequest = {
      body: {
        email: "test",
        role: "test",
        name: "test",
      },
      params: {
        socketId: "socket123",
      },
    };

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    (UserService.prototype.findByEmail as jest.Mock).mockRejectedValue(
      new Error("An error occurred")
    );
    const userController = new UserController();

    await userController.email(mockRequest as any, mockResponse as any);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({
      error: "Internal Server Error",
    });
  });

  it("create a user successfully", async () => {
    const mockRequest = {
      body: {
        password: "test",
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRoYW1iYXJhc2FoYXNzYWthQGdtYWlsLmNvbSIsInJvbGUiOiJ0ZXN0IiwiaWF0IjoxNzA3MDU2NDEwLCJleHAiOjE3MDcwNjAwMTB9.0mgMuK4jD4iWbqnye6NXFRgCxccc-CLbJERrOqFr7-U",
      },
      params: {
        socketId: "socket123",
      },
    };

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const user = new User();
    user.compareTempToken = jest.fn().mockResolvedValue(true);
    (UserService.prototype.findByEmail as jest.Mock).mockResolvedValue(user);
    const userController = new UserController();

    await userController.create(mockRequest as any, mockResponse as any);

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: "User created successfully",
    });
  });

  it("should handle an error when create user unsuccessful", async () => {
    const mockRequest = {
      body: {
        password: "test",
        token: "test",
      },
      params: {
        socketId: "socket123",
      },
    };

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const user = new User();
    user.compareTempToken = jest.fn().mockResolvedValue(true);
    (UserService.prototype.findByEmail as jest.Mock).mockResolvedValue(user);
    const userController = new UserController();

    await userController.create(mockRequest as any, mockResponse as any);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({
      error: "Internal Server Error",
    });
  });

  it("should register a user successfully", async () => {
    const mockRequest = {
      body: {
        email: "test",
        password: "test",
        role: "test",
        },
        params: {
            socketId: "socket123",
            },
        };
        const mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        const user = new User();
        user.verified = false;
        (UserService.prototype.findByEmail as jest.Mock).mockResolvedValue(user);
        const userController = new UserController();

        await userController.register(mockRequest as any, mockResponse as any);

        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith({
            message: "User created successfully",
        });
    });

    it("should handle an error when register using preused email", async () => {
        const mockRequest = {
            body: {
                email: "test",
                password: "test",
                role: "test",
            },
            params: {
                socketId: "socket123",
            },
        };
        const mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        const user = new User();
        user.verified = true;
        (UserService.prototype.findByEmail as jest.Mock).mockResolvedValue(
            user
        );
        const userController = new UserController();

        await userController.register(mockRequest as any, mockResponse as any);

        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith({
            messege: "email already exists", isVerified: true
        });
    });
});

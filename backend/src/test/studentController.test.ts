import { Request, Response } from "express";
import StudentController from "../controllers/studentController";
import StudentService from "../services/studentService";

jest.mock("../services/studentService");

describe("StudentController", () => {
  let req: Request;
  let res: Response;

  beforeEach(() => {
    req = {} as Request;
    res = {} as Response;
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
  });

  describe("addNewStudentController", () => {
    it("should add a new student", async () => {
      req.body = {
        id: 99,
        name: "Test Student",
        gender: "Other",
        address: "Colombo",
        mobile: "0712345678",
        dob: "1999-01-01",
        age: 25,
      };

      await StudentController.addNewStudentController(req, res);

      expect(StudentService.addNewStudentService).toHaveBeenCalledWith(
        req,
        res,
      );
    });
  });

  describe("getAllStudentsController", () => {
    it("should get all students", async () => {
      await StudentController.getAllStudentsController(req, res);

      expect(StudentService.getAllStudentsService).toHaveBeenCalledWith(
        req,
        res,
      );
    });
  });

  describe("editStudentController", () => {
    it("should edit a student", async () => {
      req.params = { id: "1" };
      req.body = {
        name: "Test Student New",
      };

      await StudentController.editStudentController(req, res);

      expect(StudentService.editStudentService).toHaveBeenCalledWith(req, res);
    });
  });

  describe("deleteStudentController", () => {
    it("should delete a student", async () => {
      req.params = { id: "1" };

      await StudentController.deleteStudentController(req, res);

      expect(StudentService.deleteStudentService).toHaveBeenCalledWith(
        req,
        res,
      );
    });
  });
});

// import { Request, Response } from "express";
// import StudentController from "../controllers/studentController";
// import StudentService from "../services/studentService";
// import http from "http";
// import { Server } from "socket.io";
// import { AppDataSource } from "..";

// jest.mock("../services/studentService");

// let server: http.Server;
// let io: Server;

// beforeAll(async () => {
//   server = http.createServer();
//   io = new Server(server, {
//     cors: {
//       origin: "*",
//       methods: ["GET", "POST"],
//     },
//   });

//   // Initialize the database and start the server
//   await AppDataSource.initialize();
//   server.listen(5000, () => {
//     console.log("Server is running on port 5000");
//   });
// });

// afterAll((done) => {
//   // Close the server and the database connection
//   server.close(() => {
//     AppDataSource.close();
//     done();
//   });
// });

// describe("StudentController", () => {
//   let req: Request;
//   let res: Response;

//   beforeEach(() => {
//     req = {} as Request;
//     res = {} as Response;
//     res.status = jest.fn().mockReturnValue(res);
//     res.json = jest.fn().mockReturnValue(res);
//   });

//   describe("addNewStudentController", () => {
//     it("should add a new student", async () => {
//       // Arrange
//       req.body = {
//         id: 99,
//         name: "Test Student",
//         gender: "Other",
//         address: "Colombo",
//         mobile: "0712345678",
//         dob: "1999-01-01",
//         age: 25,
//       };

//       // Act
//       await StudentController.addNewStudentController(req, res);

//       // Assert
//       expect(StudentService.addNewStudentService).toHaveBeenCalledWith(
//         req,
//         res,
//       );
//     });
//   });

//   describe("getAllStudentsController", () => {
//     it("should get all students", async () => {
//       // Act
//       await StudentController.getAllStudentsController(req, res);

//       // Assert
//       expect(StudentService.getAllStudentsService).toHaveBeenCalledWith(
//         req,
//         res,
//       );
//     });
//   });

//   describe("editStudentController", () => {
//     it("should edit a student", async () => {
//       // Arrange
//       req.params = { id: "1" };
//       req.body = {
//         name: "Test Student New",
//       };

//       // Act
//       await StudentController.editStudentController(req, res);

//       // Assert
//       expect(StudentService.editStudentService).toHaveBeenCalledWith(req, res);
//     });
//   });

//   describe("deleteStudentController", () => {
//     it("should delete a student", async () => {
//       // Arrange
//       req.params = { id: "1" };

//       // Act
//       await StudentController.deleteStudentController(req, res);

//       // Assert
//       expect(StudentService.deleteStudentService).toHaveBeenCalledWith(
//         req,
//         res,
//       );
//     });
//   });
// });

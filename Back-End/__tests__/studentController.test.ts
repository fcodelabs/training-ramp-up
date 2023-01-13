// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { io } from '../server';
// import { getAllStudents, addStudent } from '../src/controllers/studentController';
// import * as studentServices from '../src/services/studentService';

// describe('getAllStudents', () => {
//   it('returns all students when service call is successful', async () => {
//     const mockStudents = [
//       { id: 1, name: 'John', gender: 'Male', address: 'Kohuwala', mobile: '0769099126', birthday: '1999-01-09' },
//       { id: 2, name: 'Jim', gender: 'Male', address: 'Kohuwala', mobile: '0769099122', birthday: '1999-01-19' },
//     ];
//     // const mockGetAllStudentsService = jest.fn().mockResolvedValue(mockStudents);

//     const mockReq: any = {} as Request;
//     const mockRes: any = {
//       status: jest.fn().mockReturnThis(),
//       json: jest.fn().mockReturnThis(),
//     } as unknown as Response;
//     await getAllStudents(mockReq, mockRes);
//     expect(mockRes.status).toHaveBeenCalledWith(200);
//     expect(mockRes.json).toHaveBeenCalledWith(mockStudents);
//   });
//   it('returns an error when service call throws an error', async () => {
//     const mockError = new Error('Error fetching students');
//     const mockReq: any = {} as Request;
//     const mockRes: any = {
//       status: jest.fn().mockReturnThis(),
//       json: jest.fn().mockReturnThis(),
//     } as unknown as Response;
//     await getAllStudents(mockReq, mockRes);
//     expect(mockRes.status).toHaveBeenCalledWith(500);
//     expect(mockRes.json).toHaveBeenCalledWith(mockError);
//   });
// });

// jest.mock('../src/services/studentService', () => ({
//   addStudentService: jest.fn(),
// }));

// jest.mock('socket.io', () => {
//   return jest.fn().mockImplementation(() => {
//     return {
//       emit: jest.fn(),
//     };
//   });
// });

// describe('addStudent', () => {
//   const req: any = {
//     body: {
//       name: 'John Doe',
//       age: 25,
//     },
//   };
//   const res: any = {
//     status: jest.fn().mockReturnThis(),
//     json: jest.fn().mockReturnThis(),
//   };

//   beforeEach(() => {
//     jest.clearAllMocks();
//   });

//   it('should call addStudentService with the correct arguments', async () => {
//     await addStudent(req, res);
//     expect(studentServices).toHaveBeenCalledWith(req.body);
//   });

//   it('should emit a message with the correct student name', async () => {
//     await addStudent(req, res);
//     expect(io.emit).toHaveBeenCalledWith('message', 'Student John Doe added');
//   });

//   it('should set the response status to 200', async () => {
//     await addStudent(req, res);
//     expect(res.status).toHaveBeenCalledWith(200);
//   });

//   it('should return a json object with a success message', async () => {
//     await addStudent(req, res);
//     expect(res.json).toHaveBeenCalledWith({ message: 'Student added successfully' });
//   });

//   it('should set the response status to 500 and return the error if there is a failure', async () => {
//     const addStudentServiceSpy = jest.spyOn(studentServices, 'addStudentService');
//     addStudentServiceSpy.mockImplementation(() => {
//       throw new Error('Failed to add student');
//     });
//     await addStudent(req, res);
//     expect(res.status).toHaveBeenCalledWith(500);
//     expect(res.json).toHaveBeenCalledWith(new Error('Failed to add student'));
//   });
// });

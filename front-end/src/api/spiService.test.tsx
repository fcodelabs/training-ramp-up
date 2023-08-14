import axios from 'axios';
import {
  getAllStudentsFromApi,
  deleteStudentApi,
  updateStudentApi,
  createStudentApi,
} from './apiService';

// Mocking Axios for testing
jest.mock('axios');

describe('API Functions', () => {
  const mockStudent = {
    id: 2,
    name: 'Hermoine',
    age: 20,
    gender: 'Male',
    address: 'Hampstead Garden',
    mobile: '1234567890',
    dob: '2004-04-04',
  };

  it('should get all students from API', async () => {
    const mockResponse = {
      data: [mockStudent],
    };

    //mock axios get function to return mockResponse
    (axios.get as jest.Mock).mockResolvedValue(mockResponse);

    const students = await getAllStudentsFromApi();
    expect(students).toEqual([mockStudent]);
    expect(axios.get).toHaveBeenCalledWith('http://localhost:4000/students');
  });

  it('should delete a student from API', async () => {
    const mockResponse = {
      data: [mockStudent],
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {},
    };

    //mock axios delete function to return mockResponse
    (axios.delete as jest.Mock).mockResolvedValue(mockResponse);

    await deleteStudentApi(1);
    expect(axios.delete).toHaveBeenCalledWith(
      'http://localhost:4000/students/1',
    );
  });

  it('should update a student in API', async () => {
    const updatedData = {
      id: 1,
      name: 'Jane Smith',
      age: 21,
      gender: 'Female',
      address: '456 Elm St',
      mobile: '9876543210',
      dob: '2000-05-15',
    };
    const mockResponse = {
      data: updatedData,
    };

    //mock axios put function to return mockResponse
    (axios.put as jest.Mock).mockResolvedValue(mockResponse);

    const updatedStudent = await updateStudentApi(1, updatedData);
    expect(updatedStudent).toEqual(updatedData);
    expect(axios.put).toHaveBeenCalledWith(
      'http://localhost:4000/students/1',
      updatedData,
    );
  });

  it('should create a new student in API', async () => {
    const mockResponse = {
      data: { mockStudent },
      status: 201, // Created status code
      statusText: 'Created',
      headers: {},
      config: {},
    };

    (axios.post as jest.Mock).mockResolvedValue(mockResponse);

    const createdStudent = await createStudentApi(mockStudent);
    expect(createdStudent).toEqual({ mockStudent });
    expect(axios.post).toHaveBeenCalledWith(
      'http://localhost:4000/students',
      mockStudent,
    );
  });
});

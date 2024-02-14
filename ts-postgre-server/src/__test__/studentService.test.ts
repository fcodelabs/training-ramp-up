import { getRepository } from 'typeorm';
import { Student } from '../models/Student';
import { getStudentsService, createStudentService, updateStudentService, deleteStudentService } from '../services/Student';

jest.mock('typeorm');

describe('Student Service', () => {
  test('getStudentsService', async () => {
    // Mock the find function to simulate getting students
    getRepository(Student).find = jest.fn().mockResolvedValue([
      { id: 1, name: 'Test Student' },
      { id: 2, name: 'Another Student' },
    ]);

    const students = await getStudentsService();

    expect(students).toHaveLength(2);
    expect(students[0]).toHaveProperty('id', 1);
    expect(students[0]).toHaveProperty('name', 'Test Student');
  });

  test('createStudentService', async () => {
    const studentData = {
      id: 1,
      name: 'Test Student',
      gender: 'Male',
      address: '123 Test St',
      mobile: '1234567890',
      dob: '2000-01-01',
      age: 21,
    };

    // Mock the findOne function to simulate no existing student
    Student.findOne = jest.fn().mockResolvedValue(null);

    // Mock the save function to simulate successful student creation
    Student.save = jest.fn().mockResolvedValue(studentData);

    const newStudent = await createStudentService(studentData);

    expect(newStudent).toHaveProperty('id', studentData.id);
    expect(newStudent).toHaveProperty('name', studentData.name);
  });

  test('updateStudentService', async () => {
    const studentData = {
      name: 'Updated Student',
      gender: 'Male',
      address: '123 Test St',
      mobile: '1234567890',
      dob: '2000-01-01',
      age: 21,
    };

    const originalStudent = {
      id: 1,
      name: 'Test Student',
      gender: 'Male',
      address: '123 Test St',
      mobile: '1234567890',
      dob: '2000-01-01',
      age: 21,
    };
  

    // Mock the findOne function to simulate finding an existing student
    getRepository(Student).findOne = jest.fn().mockResolvedValue(originalStudent);

    // Mock the save function to simulate successful student update
    getRepository(Student).save = jest.fn().mockImplementation((student) => Promise.resolve(student));

    const updatedStudent = await updateStudentService('1', studentData);

    expect(updatedStudent).toHaveProperty('id', 1);
    expect(updatedStudent).toHaveProperty('name', studentData.name);
  });

  test('deleteStudentService', async () => {
    // Mock the findOne function to simulate finding an existing student
    getRepository(Student).findOne = jest.fn().mockResolvedValue({
      id: 1,
      name: 'Test Student',
    });

    // Mock the remove function to simulate successful student deletion
    getRepository(Student).remove = jest.fn().mockResolvedValue({});

    const message = await deleteStudentService('1');

    expect(message).toBe('Student deleted successfully');
  });
});
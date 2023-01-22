import {
  getAllStudentService,
  saveStudentService,
  updateStudentService,
  deleteStudentService,
  findStudent,
} from '../studentService';
import { Student } from '../../entities/studentEntity';
import { AppDataSource } from '../../dataSource';
import { StudentModel } from '../../utils/interfaces';
const studentsRepo = AppDataSource.getRepository(Student);

describe('Student', () => {
  describe('Get All students', () => {
    const allStudents = [
      {
        name: 'dilshan',
        gender: 'Male',
        address: 'colombo6',
        mobileNo: '011244',
        birth: new Date(2 / 24 / 2003),
        age: 22,
        id: 1,
      },
    ];

    test('Get All students success', async () => {
      studentsRepo.find = jest.fn().mockResolvedValue(allStudents);
      const res: any = await getAllStudentService();
      expect(res).toEqual(allStudents);
    });

    test('Get all students failed', async () => {
      studentsRepo.find = jest.fn().mockRejectedValue(null);
      const res = await getAllStudentService();
      expect(res).toEqual({ error: 'Can not get Student' });
    });
  });

  describe('Add Student', () => {
    const newStudent: StudentModel = {
      name: 'dilshan',
      gender: 'Male',
      address: 'colombo6',
      mobileNo: '011244',
      birth: new Date(2 / 24 / 2003),
      age: 22,
      id: 1,
    };
    test('Add Student Success', async () => {
      studentsRepo.save = jest.fn().mockResolvedValue(newStudent);
      const res: any = await saveStudentService(newStudent);
      expect(res.message).toEqual('Student added successfully !');
    });
    test('Add Student Fail', async () => {
      studentsRepo.save = jest.fn().mockRejectedValue(null);
      const res = await saveStudentService(newStudent);
      expect(res).toEqual({ error: 'Faild to add student !' });
    });
  });

  describe('Update Student', () => {
    const newStudent: StudentModel = {
      name: 'dilshan',
      gender: 'Male',
      address: 'colombo6',
      mobileNo: '011244',
      birth: new Date(2 / 24 / 2003),
      age: 22,
      id: 1,
    };
    test('Update Student Success', async () => {
      studentsRepo.save = jest.fn().mockResolvedValue(newStudent);
      const res: any = await updateStudentService(newStudent);
      expect(res.message).toEqual('Student updated successfully !');
    });
    test('Update Student Fail', async () => {
      studentsRepo.save = jest.fn().mockRejectedValue(null);
      const res = await updateStudentService(newStudent);
      expect(res).toEqual({ error: 'Faild to Update student !' });
    });
  });

  describe('Delete Student', () => {
    const newStudent: StudentModel = {
      name: 'dilshan',
      gender: 'Male',
      address: 'colombo6',
      mobileNo: '011244',
      birth: new Date(2 / 24 / 2003),
      age: 22,
      id: 1,
    };
    test('Delete Student Success', async () => {
      studentsRepo.delete = jest.fn().mockResolvedValue(newStudent.id);
      const res: any = await deleteStudentService(newStudent.id);
      expect(res).toEqual(newStudent.id);
    });
    test('Delete Student Fail', async () => {
      studentsRepo.delete = jest.fn().mockRejectedValue(null);
      const res = await deleteStudentService(newStudent.id);
      expect(res).toEqual({ error: 'Faild to Delete student !' });
    });
  });
});

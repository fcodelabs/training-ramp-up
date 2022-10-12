import { Test, TestingModule } from '@nestjs/testing';
import { StudentService } from './student.service';
import { Student } from '../entity/student.entity';
// import { Students } from 'src/ent';
// import { Repository } from 'typeorm';

describe('StudentService', () => {
  let service: StudentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StudentService],
    }).compile();

    service = module.get<StudentService>(StudentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getStudents', () => {
    const allStudents = [
      {
        id: 1,
        name: 'Dalin',
        address: 'Trinco',
        gender: 'Male',
        mobile_number: '0712099943',
        age: 26,
        date: new Date('1996-07-09 23:55:00'),
      },
      {
        id: 2,
        name: 'Udara',
        address: 'Badulla',
        gender: 'Male',
        mobileNo: '1122334455',
        age: 27,
        dob: new Date('1995-10-23 16:00:00'),
      },
    ] as any;
    // const objStudentService = new StudentService(Repository<Students>);
    test('Getting students success, should return all students', async () => {
      Student.find = jest.fn().mockReturnValue(allStudents);
      // const res = await getStudents();
      // expect(res).toEqual({ students: allStudents });
    });
    // //negative test
    // test('Getting students failed, should return an error message', async () => {
    //   studentRepository.find = jest.fn().mockImplementationOnce(() => {
    //     throw new Error('Not Found!');
    //   });
    //   const res = await getStudents();
    //   expect(res).toEqual({ error: "Couldn't retrieve student data!" });
    // });
  });
});

import { CreateStudentDto } from './dto/create-student.dto';

export const studentData: CreateStudentDto[] = [
  {
    id: 1,
    name: 'shane',
    gender: 'male',
    address: 'homagama',
    mobileNo: '0112748768',
    dateOfBirth: new Date('1996-09-16'),
  },
  {
    id: 2,
    name: 'ishara',
    gender: 'male',
    address: 'homagama',
    mobileNo: '0776722336',
    dateOfBirth: new Date('1996-09-16'),
  },
  {
    id: 3,
    name: 'ishara',
    gender: 'male',
    address: '58/10, 1st lane ',
    mobileNo: '0776722336',
    dateOfBirth: new Date('1996-07-21'),
  },
  {
    id: 4,
    name: 'ishara',
    gender: 'female',
    address: '58/10, 1st lane ',
    mobileNo: '0776722336',
    dateOfBirth: new Date('1996-07-21'),
  },
  {
    id: 5,
    name: 'divyan',
    gender: 'male',
    address: 'homagama ',
    mobileNo: '0112748768',
    dateOfBirth: new Date('1997-07-21'),
  },
];

import { StudentService } from './student.service';
import { Students } from '../entity/student.interface';
export declare class StudentController {
  private readonly studentService;
  constructor(studentService: StudentService);
  getAll(): Promise<Students[]>;
  create(student: Students): Promise<Students>;
  delete(studentId: any): Promise<import('typeorm').DeleteResult>;
  Update(studentId: any): Promise<import('typeorm').UpdateResult>;
}

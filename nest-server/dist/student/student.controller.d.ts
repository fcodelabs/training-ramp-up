import { StudentService } from './student.service';
import { Students } from '../dto/student.dto';
export declare class StudentController {
    private readonly studentService;
    constructor(studentService: StudentService);
    getAll(): Promise<Students[]>;
    create(student: Students): Promise<Students>;
    delete(studentId: any): Promise<import("typeorm").DeleteResult>;
    Update(studentId: any, studentUpdate: any): Promise<import("typeorm").UpdateResult>;
}

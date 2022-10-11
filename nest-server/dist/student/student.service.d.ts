import { Student } from '../entity/student.entity';
import { Repository } from 'typeorm';
import { Students } from 'src/entity/student.interface';
export declare class StudentService {
    private readonly StudentRepo;
    constructor(StudentRepo: Repository<Students>);
    getAll(): Promise<Students[]>;
    createPost(student: Students): Promise<Students>;
    deleteOne(categoryId: string): Promise<import("typeorm").DeleteResult>;
    updateStudent(studentId: any, studentUpdate: Student): Promise<import("typeorm").UpdateResult>;
}
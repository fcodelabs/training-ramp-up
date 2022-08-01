import { Injectable, } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { StudentCreateDto } from "./dto/create-student.input";
import { Student } from "./entities/student.entity";

@Injectable()
export class StudentService {
    constructor(@InjectRepository(Student) private studentRepository: Repository<Student>) { }

    async findAll(): Promise<Student[]> {
        return this.studentRepository.find()

    }

    async create(student: StudentCreateDto): Promise<Student> {
        let studentDetial = this.studentRepository.create(student);
        return this.studentRepository.save(studentDetial);
    }
}
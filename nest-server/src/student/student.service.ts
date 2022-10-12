import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from '../entity/student.entity';
import { Repository } from 'typeorm';
import { Students } from 'src/dto/student.dto';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private readonly StudentRepo: Repository<Students>,
  ) {}

  public async getAll() {
    return await this.StudentRepo.find();
  }

  async createPost(student: Students) {
    return await this.StudentRepo.save(student);
  }

  async deleteOne(studnetId: string) {
    return await this.StudentRepo.delete(studnetId);
  }

  async updateStudent(studentId: any, studentUpdate: Student) {
    return await this.StudentRepo.update(studentId, studentUpdate);
  }
}
